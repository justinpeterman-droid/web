import SpinningCubeSmokeTest from "@/components/SpinningCubeSmokeTest";

// Phase 1 home page: nothing but the 3D smoke test. The spinning cube proves the
// React Three Fiber pipeline works. Per the plan, this temporary canvas is moved
// into the persistent app-shell canvas in Phase 4 and removed from here.
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black p-8">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
        3D toolchain smoke test
      </h1>
      <div className="h-[60vh] w-full max-w-2xl">
        <SpinningCubeSmokeTest />
      </div>
      <p className="text-sm text-zinc-400">
        A spinning cube means three + @react-three/fiber render end to end.
      </p>
    </main>
  );
}
