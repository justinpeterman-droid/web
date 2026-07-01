import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const validPayload = {
  name: "Avery Brooks",
  email: "avery@example.com",
  message: "I would like to learn more about your services.",
};

function createContactRequest(): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validPayload),
  });
}

describe("POST /api/contact", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("fails closed in production when email delivery is not configured", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("CONTACT_TO_EMAIL", "owner@example.com");

    const response = await POST(createContactRequest());

    await expect(response.json()).resolves.toEqual({
      error: "Contact form is not configured.",
    });
    expect(response.status).toBe(503);
  });

  it("keeps the development log fallback for local testing without secrets", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("CONTACT_TO_EMAIL", "owner@example.com");
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});

    const response = await POST(createContactRequest());

    await expect(response.json()).resolves.toEqual({ ok: true, mode: "log" });
    expect(response.status).toBe(200);
    expect(infoSpy).toHaveBeenCalledOnce();
  });
});
