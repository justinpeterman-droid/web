import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";

export default function NotFound() {
  return (
    <main id="main-content" className="container-shell py-20">
      <PageIntro
        eyebrow="404"
        title="This scene isn’t in the reel"
        description="The page you requested doesn’t exist. The canvas stays live — only the route changed."
      />
      <Link href="/" className="button-primary">
        Return home
      </Link>
    </main>
  );
}
