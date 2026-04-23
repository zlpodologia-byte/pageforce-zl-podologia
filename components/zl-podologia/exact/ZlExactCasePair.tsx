import Image from "next/image";

export function ZlExactCasePair({
  title,
  body,
  beforeSrc,
  afterSrc,
}: {
  title: string;
  body: string;
  beforeSrc: string;
  afterSrc: string;
}) {
  return (
    <article className="rounded-[1.6rem] border border-[#eadfd8] bg-white p-4 shadow-[0_12px_30px_rgba(123,98,78,0.05)]">
      <div className="grid grid-cols-2 gap-2">
        <CaseImage label="Antes" src={beforeSrc} />
        <CaseImage label="Depois" src={afterSrc} />
      </div>
      <h4
        className="mt-4 text-[1.28rem] leading-[1.04] tracking-[-0.03em] text-[#352822]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
      >
        {title}
      </h4>
      <p className="mt-3 text-[0.88rem] leading-[1.65] text-[#6d5a4c]">{body}</p>
    </article>
  );
}

function CaseImage({ label, src }: { label: string; src: string }) {
  return (
    <div className="relative overflow-hidden rounded-[1.15rem] border border-[#efe3db]">
      <div className="relative aspect-[1.05]">
        <Image src={src} alt={label} fill sizes="(min-width: 1024px) 16vw, 44vw" className="object-cover" />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent_0%,rgba(50,38,31,0.68)_100%)] px-3 py-2 text-[0.72rem] uppercase tracking-[0.2em] text-white">
        {label}
      </div>
    </div>
  );
}
