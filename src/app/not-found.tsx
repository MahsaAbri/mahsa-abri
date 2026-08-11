import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#a89a86]">404</p>
      <h1 className="mt-5 max-w-lg text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-tight tracking-[-0.03em] text-[#2a251f]">
        There&apos;s nothing drawn here yet.
      </h1>
      <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#8a7f70]">
        That page doesn&apos;t exist.
      </p>

      <Link
        href="/"
        className="mt-9 flex items-center gap-2.5 rounded-full border border-[#2a251f]/12 bg-white/60 px-5 py-2.5 text-[14px] text-[#2a251f] transition-all hover:-translate-y-0.5 hover:shadow-md"
      >
        Back to work
      </Link>
    </div>
  );
}
