import { Fragment, type ReactNode } from "react";

import { Media } from "@/components/Media";

/**
 * Renders the small set of formatting marks documented in `posts.ts`.
 *
 * Deliberately tiny — there's no markdown library here, so there's nothing to
 * break, and nothing unexpected can end up on the page.
 */
export function Prose({ text, className = "" }: { text: string; className?: string }) {
  return <div className={`prose ${className}`}>{renderBlocks(text)}</div>;
}

const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)]+)\)$/;

function renderBlocks(text: string): ReactNode[] {
  const blocks = text.trim().split(/\n{2,}/);

  return blocks.map((raw, i) => {
    const block = raw.trim();
    const lines = block.split("\n").map((l) => l.trim());
    const key = `b${i}`;

    if (/^-{3,}$/.test(block)) return <hr key={key} />;

    if (block.startsWith("## ")) return <h2 key={key}>{inline(block.slice(3))}</h2>;
    if (block.startsWith("### ")) return <h3 key={key}>{inline(block.slice(4))}</h3>;

    const image = block.match(IMAGE_LINE);
    if (image) {
      return (
        <figure key={key}>
          <Media
            media={{ src: image[2], alt: image[1] }}
            sizes="(max-width: 900px) 100vw, 820px"
            fit="cover"
          />
          {image[1] && <figcaption>{image[1]}</figcaption>}
        </figure>
      );
    }

    if (lines.every((l) => l.startsWith("> "))) {
      return <blockquote key={key}>{inline(lines.map((l) => l.slice(2)).join(" "))}</blockquote>;
    }

    if (lines.every((l) => l.startsWith("- "))) {
      return (
        <ul key={key}>
          {lines.map((l, j) => (
            <li key={j}>{inline(l.slice(2))}</li>
          ))}
        </ul>
      );
    }

    return <p key={key}>{inline(block.replace(/\n/g, " "))}</p>;
  });
}

/** **bold**, *italic* and [links](https://…) inside a line of text. */
function inline(text: string): ReactNode {
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(pattern).filter((p) => p !== "");

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const external = /^https?:\/\//.test(link[2]);
      return (
        <a
          key={i}
          href={link[2]}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {link[1]}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
