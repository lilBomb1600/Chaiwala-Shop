import type { Metadata } from "next";
import { Visit } from "@/components/Visit";
import { Faq } from "@/components/Faq";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Chaiwala Shop is at 2008 Salvio St, Concord, CA, next to Todos Santos Plaza. Open every day from 10 AM. Call (925) 465-6886.",
};

export default function ContactPage() {
  return (
    <>
      <Visit headingLevel={1} className="!pt-32 md:!pt-44" />
      <Faq />
    </>
  );
}
