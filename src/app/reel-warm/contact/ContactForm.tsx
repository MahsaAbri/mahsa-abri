"use client";

import { useContactForm } from "@/lib/contact";

const fieldClass =
  "w-full border-b border-[#2a251f]/20 bg-transparent py-3.5 text-[16px] text-[#2a251f] outline-none transition-colors placeholder:text-[#a89a86] focus:border-[#b4472e]";

const labelClass = "block font-mono text-[10px] uppercase tracking-[0.24em] text-[#a89a86]";

export function ContactForm() {
  const { state, onSubmit, usesMailto } = useContactForm();

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <div className="grid gap-10 sm:grid-cols-2">
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
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          Project
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What are you making?"
          className={`${fieldClass} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={state === "sending"}
          className="group relative overflow-hidden bg-[#b4472e] px-10 py-4 font-mono text-[11px] uppercase tracking-[0.24em] text-[#f4efe6] transition-transform duration-300 hover:scale-[1.02] active:scale-100 disabled:opacity-50"
        >
          {state === "sending" ? "Sending…" : usesMailto ? "Compose email" : "Send"}
        </button>

        {state === "sent" && (
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#b4472e]">
            {usesMailto ? "Opening your email app…" : "Received — I'll reply shortly."}
          </p>
        )}
        {state === "error" && (
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8f2f1e]">
            Didn&apos;t send. Please email me directly.
          </p>
        )}
      </div>
    </form>
  );
}
