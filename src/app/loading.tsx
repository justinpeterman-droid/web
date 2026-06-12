export default function Loading() {
  return (
    <main
      id="main-content"
      className="container-shell flex min-h-[50vh] items-center py-20"
    >
      <p
        className="text-sm tracking-wide text-[var(--color-muted)]"
        role="status"
        aria-live="polite"
      >
        Settling in…
      </p>
    </main>
  );
}
