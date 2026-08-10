import { site } from "@/content/site";

import { ContactForm } from "./ContactForm";

export const metadata = { title: "Contact" };

export default function ReelContactPage() {
  return (
    <div className="px-5 pb-24 pt-32 sm:px-8 lg:px-10 lg:pt-40">
      <header className="max-w-4xl">
        <a
          href={`mailto:${site.email}`}
          className="group block text-[clamp(1.9rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white"
        >
          {site.email}
          <span className="mt-3 block h-px w-full origin-left scale-x-0 bg-[#e8552f] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
        </a>
        <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-white/50">
          {site.contact.intro}
        </p>
      </header>

      <div className="mt-16 lg:grid lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <ul className="space-y-3">
          {site.location && <li className="text-[16px] text-white/50">{site.location}</li>}
          {site.socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[16px] text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#e8552f]"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-14 lg:mt-0">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
