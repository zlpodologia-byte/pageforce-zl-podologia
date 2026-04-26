import Image from "next/image";
import { ExactGlyph } from "@/components/zl-podologia/exact/ZlExactAtoms";

export function ZlExactProfileCard({
  name,
  role,
  description,
  src,
  alt,
}: {
  name: string;
  role: string;
  description: string;
  src: string;
  alt: string;
}) {
  return (
    <article className="overflow-hidden rounded-[1.55rem] border border-[#D9DAD7] bg-white shadow-[0_14px_34px_rgba(123,98,78,0.08)]">
      <div className="relative aspect-[0.88]">
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 24vw, 100vw" className="object-cover" />
      </div>
      <div className="border-t border-[#D9DAD7] px-5 py-4">
        <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#9a7f5c]">{role}</p>
        <h3
          className="mt-2 text-[1.5rem] leading-[1] tracking-[-0.03em] text-[#32261f]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        >
          {name}
        </h3>
        <p className="mt-3 text-[0.9rem] leading-[1.65] text-[#6d5a4c]">{description}</p>
      </div>
    </article>
  );
}

export function ZlExactGalleryCard({
  src,
  alt,
  wide = false,
}: {
  src: string;
  alt: string;
  wide?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-[1.6rem] border border-[#e7d7cc] bg-white shadow-[0_16px_40px_rgba(123,98,78,0.08)] ${wide ? "sm:col-span-3" : ""}`}>
      <div className={`relative ${wide ? "aspect-[2.08/1]" : "aspect-[1.08]"}`}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 34vw, 92vw" className="object-cover" />
      </div>
    </div>
  );
}

export function ZlExactComparePanel({
  title,
  items,
  good,
}: {
  title: string;
  items: readonly string[];
  good: boolean;
}) {
  return (
    <div className="rounded-[1.35rem] border border-[#e7d7cc] bg-white p-4">
      <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#9a7f5c]">{title}</p>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-[0.9rem] leading-[1.55] text-[#4a3a31]">
            <span className={good ? "text-[#1d9e75]" : "text-[#e24b4a]"}>
              <ExactGlyph kind="check" className="h-4 w-4" />
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ZlExactClosingPoint({ children }: { children: string }) {
  return (
    <div className="rounded-[1.1rem] border border-[#e7d7cc] bg-[#fcf8f4] p-4 text-[0.88rem] leading-[1.6] text-[#4a3a31]">
      {children}
    </div>
  );
}
