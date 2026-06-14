export type ContactDeliveryMode = "email" | "log" | "unavailable";

type ContactDeliveryModeInput = {
  resendApiKey: string | undefined;
  contactTo: string | undefined;
  nodeEnv: string | undefined;
  vercelEnv: string | undefined;
};

export function resolveContactDeliveryMode({
  resendApiKey,
  contactTo,
  nodeEnv,
  vercelEnv,
}: ContactDeliveryModeInput): ContactDeliveryMode {
  if (resendApiKey && contactTo) {
    return "email";
  }

  if (nodeEnv === "production" || vercelEnv === "production") {
    return "unavailable";
  }

  return "log";
}
