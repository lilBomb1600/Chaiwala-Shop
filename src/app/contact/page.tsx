import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { FAQSection } from "@/components/shared/FAQSection";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit or reach out to Chaiwala Shop at 2008 Salvio St, Concord, CA. Call (925) 465-6886 or send us a message.",
};

const infoCards = [
  {
    icon: MapPin,
    label: "Address",
    value: business.address.full,
    href: business.mapsHref,
  },
  {
    icon: Phone,
    label: "Phone",
    value: business.phone,
    href: business.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: business.email,
    href: `mailto:${business.email}`,
  },
];

export default function ContactPage() {
  return (
    <div className="bg-cream">
      <section className="pb-16 pt-32 sm:pt-40">
        <Container className="text-center">
          <Reveal>
            <span className="mb-3 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-saffron">
              <span className="h-px w-6 bg-saffron" />
              Contact
              <span className="h-px w-6 bg-saffron" />
            </span>
            <h1 className="font-display text-4xl font-bold text-espresso sm:text-5xl">
              We&apos;d love to see you
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-espresso-light">
              Questions, catering requests, or just want to say hi? Reach out any way that&apos;s easiest.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid gap-4 sm:grid-cols-3">
            {infoCards.map(({ icon: Icon, label, value, href }, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex h-full flex-col items-center gap-3 rounded-3xl bg-white p-8 text-center shadow-sm shadow-espresso/5 transition-shadow hover:shadow-lg hover:shadow-espresso/10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pine/10 text-pine">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-espresso-light">
                    {label}
                  </span>
                  <span className="font-display font-semibold text-espresso">{value}</span>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-6">
              <div className="overflow-hidden rounded-3xl shadow-sm shadow-espresso/5">
                <iframe
                  title="Chaiwala Shop location on Google Maps"
                  src={business.mapsEmbedSrc}
                  className="h-64 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="rounded-3xl bg-white p-8 shadow-sm shadow-espresso/5">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pine/10 text-pine">
                    <Clock className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-espresso">Business Hours</h3>
                </div>
                <ul className="mt-5 divide-y divide-beige text-sm">
                  {business.hours.map((h) => (
                    <li key={h.day} className="flex items-center justify-between py-2.5">
                      <span className="font-medium text-espresso">{h.day}</span>
                      <span className="text-espresso-light">{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FAQSection />
    </div>
  );
}
