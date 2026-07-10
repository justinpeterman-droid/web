import { redirect } from "next/navigation";

/**
 * Per the V2 spec, contact lives on the About page (right "Connection" column).
 * This route exists so the nav "Contact" link and any external /contact links
 * resolve to the form anchor instead of 404-ing.
 */
export default function ContactPage() {
  redirect("/about#connect");
}
