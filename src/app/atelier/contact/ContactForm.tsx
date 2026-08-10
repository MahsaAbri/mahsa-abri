"use client";

import { useContactForm } from "@/lib/contact";

const fieldClass =
  "w-full border-b border-[#2a251f]/20 bg-transparent py-3 text-[16px] text-[#2a251f] outline-none transition-colors placeholder:text-[#a89a86] focus:border-[#b4472e]";

const labelClass = "block font-serif text-[13px] italic text-[#8a7f70]";

export function ContactForm() {
  const { state, onSubmit, usesMailto } = useContactForm();

  return (
    <form onSubmit={onSubmit} className="bg-white/60 p-7 shadow-[0_2px_14px_rgba(42,37,31,0.07)] sm:p-9">
      <div className="space-y-8">
        <div>
          <label className={labelClass} htmlFor="name">
            Your name
          </label>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            Where should I reply?
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
            Tell me about it
          </label>
          <textarea id="message" name="message" required rows={6} className={`${fieldClass} resize-y`} />
        </div>
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={state === "sending"}
          className="bg-[#b4472e] px-9 py-3.5 text-[12px] uppercase tracking-[0.22em] text-[#f7f2e9] transition-transform duration-300 hover:scale-[1.02] active:scale-100 disabled:opacity-50"
        >
          {state === "sending" ? "Sending…" : usesMailto ? "Compose email" : "Send"}
        </button>

        {state === "sent" && (
          <p className="font-serif text-[15px] italic text-[#b4472e]">
            {usesMailto ? "Opening your email app…" : "Thank you — I'll write back soon."}
          </p>
        )}
        {state === "error" && (
          <p className="font-serif text-[15px] italic text-red-700">
            That didn&apos;t send. Please email me directly.
          </p>
        )}
      </div>
    </form>
  );
}
