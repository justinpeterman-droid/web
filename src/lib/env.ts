/** Server-only flags — do not import in client components. */
export function isMaintenanceMode(): boolean {
  return process.env.MAINTENANCE_MODE === "true";
}
