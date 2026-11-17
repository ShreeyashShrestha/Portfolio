import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: Partial<PortableTextComponents> = {
  block: {
    normal: ({ children }) => <p className="whitespace-pre-wrap">{children}</p>,
    h3: ({ children }) => <h3 className="text-xl font-semibold text-white">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-2 pl-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
};

export default function ProjectDescription({ content, fallback }: { content?: PortableTextBlock[]; fallback: string }) {
  return <div className="space-y-5 text-base leading-8 text-slate-300">
    {content?.length ? <PortableText value={content} components={components} /> :
      fallback.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index} className="whitespace-pre-line">{paragraph}</p>)}
  </div>;
}
