import { site } from "@/content/site";

import { ContactForm } from "./ContactForm";

export const metadata = { title: "Contact" };

export default function AtelierContactPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-14 sm:px-8 lg:px-10 lg:pt-20">
      <header className="border-b border-[#2a251f]/15 pb-10">
        <h1 className="font-serif text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.02em] text-[#2a251f]">
          Contact
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.75] text-[#6d6455]">
          {site.contact.intro}
        </p>
      </header>

      <div className="grid gap-12 py-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <ul className="space-y-3">
          <li>
            <a
              href={`mailto:${site.email}`}
              className="font-serif text-[clamp(1.3rem,2.4vw,1.9rem)] text-[#2a251f] underline decoration-[#b4472e]/30 underline-offset-[6px] transition-colors hover:text-[#b4472e]"
            >
              {site.email}
            </a>
          </li>
          {site.location && <li className="pt-2 text-[15px] text-[#8a7f70]">{site.location}</li>}
          {site.socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] text-[#57503f] underline decoration-[#2a251f]/20 underline-offset-4 transition-colors hover:text-[#b4472e]"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <ContactForm />
      </div>
    </div>
  );
}
