"use client";

import { useState, type FormEvent } from "react";

import { site } from "@/content/site";

export type ContactState = "idle" | "sending" | "sent" | "error";

/**
 * Contact form behaviour, shared by all three designs so they can look
 * completely different while behaving identically.
 *
 * With a Formspree endpoint set in `site.ts` the message is sent in the
 * background. Without one, it falls back to opening the visitor's email app
 * with the message already filled in — so the form is never a dead end.
 */
export function useContactForm() {
  const [state, setState] = useState<ContactState>("idle");
  const endpoint = site.contact.formEndpoint;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    if (!endpoint) {
      const subject = encodeURIComponent(`Enquiry from ${name || "your website"}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setState("sent");
      return;
    }

    setState("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return { state, onSubmit, usesMailto: !endpoint };
}
