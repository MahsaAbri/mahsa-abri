"use client";

import { useContactForm } from "@/lib/contact";

const fieldClass =
  "w-full border-b border-black/15 bg-transparent py-3 text-[16px] text-neutral-700 outline-none transition-colors placeholder:text-neutral-300 focus:border-[#3aa9a4]";

const labelClass =
  "block font-condensed text-[12px] uppercase tracking-[0.24em] text-neutral-400";

export function ContactForm() {
  const { state, onSubmit, usesMailto } = useContactForm();

  return (
    <form onSubmit={onSubmit} className="space-y-9">
      <div>
        <label className={labelClass} htmlFor="name">
          Name
        </label>
        <input id="name" name="name" required autoComplete="name" className={fieldClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          Message
        </label>
        <textarea id="message" name="message" required rows={5} className={`${fieldClass} resize-y`} />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={state === "sending"}
          className="group relative overflow-hidden border border-[#3aa9a4] px-9 py-3 font-condensed text-[13px] uppercase tracking-[0.26em] text-[#3aa9a4] transition-colors duration-500 hover:text-white disabled:opacity-50"
        >
          <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-[#3aa9a4] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
          <span className="relative z-10">
            {state === "sending" ? "Sending…" : usesMailto ? "Compose Email" : "Send"}
          </span>
        </button>

        {state === "sent" && (
          <p className="font-condensed text-[15px] text-[#3aa9a4]">
            {usesMailto ? "Opening your email app…" : "Thank you — I'll be in touch shortly."}
          </p>
        )}
        {state === "error" && (
          <p className="font-condensed text-[15px] text-red-600">
            Something went wrong. Please email me directly.
          </p>
        )}
      </div>
    </form>
  );
}
