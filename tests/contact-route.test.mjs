import assert from "node:assert/strict";
import { test } from "node:test";
import { POST } from "../src/app/api/contact/route.ts";

const validPayload = {
  name: "Jane Doe",
  email: "jane@example.com",
  message: "I would like to schedule a consultation.",
};

function createContactRequest(payload = validPayload) {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

function withEnv(overrides, run) {
  return async (t) => {
    const previousEnv = {
      NODE_ENV: process.env.NODE_ENV,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
      CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    };

    t.after(() => {
      for (const [key, value] of Object.entries(previousEnv)) {
        if (value === undefined) {
          delete process.env[key];
        } else {
          process.env[key] = value;
        }
      }
    });

    for (const [key, value] of Object.entries(overrides)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }

    await run();
  };
}

test(
  "POST rejects production submissions when email delivery is not configured",
  withEnv(
    {
      NODE_ENV: "production",
      RESEND_API_KEY: undefined,
      CONTACT_TO_EMAIL: undefined,
    },
    async () => {
      const response = await POST(createContactRequest());

      assert.equal(response.status, 503);
      assert.deepEqual(await response.json(), {
        error: "Contact email is not configured.",
      });
    },
  ),
);

test(
  "POST keeps the local logging fallback outside production",
  withEnv(
    {
      NODE_ENV: "development",
      RESEND_API_KEY: undefined,
      CONTACT_TO_EMAIL: undefined,
    },
    async () => {
      const originalInfo = console.info;
      console.info = () => {};

      try {
        const response = await POST(createContactRequest());

        assert.equal(response.status, 200);
        assert.deepEqual(await response.json(), { ok: true, mode: "log" });
      } finally {
        console.info = originalInfo;
      }
    },
  ),
);
