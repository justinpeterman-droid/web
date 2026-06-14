import test from "node:test";
import assert from "node:assert/strict";

import { resolveContactDeliveryMode } from "../src/lib/contactDeliveryMode.ts";

test("uses email delivery when required email config is present", () => {
  assert.equal(
    resolveContactDeliveryMode({
      resendApiKey: "re_test_key",
      contactTo: "owner@example.com",
      nodeEnv: "production",
      vercelEnv: "production",
    }),
    "email",
  );
});

test("allows log-only contact handling during local development", () => {
  assert.equal(
    resolveContactDeliveryMode({
      resendApiKey: undefined,
      contactTo: undefined,
      nodeEnv: "development",
      vercelEnv: undefined,
    }),
    "log",
  );
});

test("treats missing email config as unavailable in production", () => {
  assert.equal(
    resolveContactDeliveryMode({
      resendApiKey: undefined,
      contactTo: "owner@example.com",
      nodeEnv: "production",
      vercelEnv: undefined,
    }),
    "unavailable",
  );
});

test("treats missing email config as unavailable on Vercel production", () => {
  assert.equal(
    resolveContactDeliveryMode({
      resendApiKey: "re_test_key",
      contactTo: undefined,
      nodeEnv: "development",
      vercelEnv: "production",
    }),
    "unavailable",
  );
});
