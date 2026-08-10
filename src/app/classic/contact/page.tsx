import { PageTitle } from "@/components/classic/PageTitle";
import { site } from "@/content/site";

import { ContactForm } from "./ContactForm";

export const metadata = { title: "Contact" };

export default function ClassicContactPage() {
  return (
    <>
      <PageTitle sub={site.contact.intro}>Contact</PageTitle>

      <div className="mx-auto grid max-w-4xl gap-14 px-5 pb-8 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <ul className="space-y-3">
          <li>
            <a
              href={`mailto:${site.email}`}
              className="text-[16px] text-neutral-600 underline decoration-black/15 underline-offset-4 transition-colors hover:text-[#3aa9a4]"
            >
              {site.email}
            </a>
          </li>
          {site.location && <li className="text-[16px] text-neutral-500">{site.location}</li>}
          {site.socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[16px] text-neutral-600 underline decoration-black/15 underline-offset-4 transition-colors hover:text-[#3aa9a4]"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <ContactForm />
      </div>
    </>
  );
}
