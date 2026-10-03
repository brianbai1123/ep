import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { chapterHref, locate, STRIPS, type Chapter, type StripKind } from "@/content/book";
import { Diagram } from "@/components/diagrams";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ChapterView({ chapter }: { chapter: Chapter }) {
  const { index, total, prev, next } = locate(chapter.slug);

  return (
    <article id="chapter" className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-sm font-semibold text-clay">
        第 <span className="font-num">{index + 1}</span> 站，共{" "}
        <span className="font-num">{total}</span> 站
        <span className="mx-2 text-line">/</span>
        <span className="text-muted">{chapter.eyebrow}</span>
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">
        {chapter.title}
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">{chapter.bookRef}</p>
      <p className="mt-6 font-kai text-lg leading-relaxed text-ink">{chapter.lead}</p>
      {chapter.strip ? (
        <PrincipleStrip kind={chapter.strip.kind} current={chapter.strip.index} />
      ) : null}
      {chapter.place ? (
        <p className="mt-4 border-l-2 border-pine pl-4 text-sm leading-relaxed text-pine">
          {chapter.place}
        </p>
      ) : null}

      <p className="mt-8 flex flex-wrap gap-4 text-sm">
        <a href="#essence" className="font-semibold text-pine underline-offset-4 hover:underline">
          第一遍 · 原书精华
        </a>
        <a href="#plain" className="font-semibold text-clay underline-offset-4 hover:underline">
          第二遍 · 五步讲明白
        </a>
      </p>

      <section id="essence" className="mt-12 scroll-mt-6">
        <h2 className="font-serif text-3xl text-ink">原书在讲什么</h2>
        <p className="mt-4 leading-relaxed">{chapter.essenceIntro}</p>
        <div className="mt-10 space-y-12">
          {chapter.essence.map((block, blockIndex) => (
            <section key={block.heading}>
              <h3 className="font-serif text-2xl leading-snug text-ink">
                <span className="mr-2 text-clay">{blockIndex + 1}</span>
                {block.heading}
              </h3>
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-[1.9]">
                  {paragraph}
                </p>
              ))}
              {block.points ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
                  {block.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
              {block.diagram ? <Diagram id={block.diagram} /> : null}
              {block.table ? (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">
                    <caption className="mb-3 text-left text-muted">
                      {block.table.caption}
                    </caption>
                    <thead>
                      <tr>
                        {block.table.headers.map((header) => (
                          <th
                            key={header}
                            className="border-b border-line px-3 py-2 font-semibold"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.table.rows.map((row) => (
                        <tr key={row.join("|")} className="align-top">
                          {row.map((cell) => (
                            <td key={cell} className="border-b border-line px-3 py-3">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </section>

      <section id="plain" className="mt-16 scroll-mt-6 bg-band px-5 py-8 sm:px-8">
        <h2 className="font-serif text-3xl text-ink">用简单的话再讲一遍</h2>
        <p className="mt-4 leading-relaxed">
          上面是原书这一站的精华。下面按同一个意思走五步，方便你检查自己是不是真的懂了。
        </p>
        <ol className="mt-8 space-y-8">
          <Step n={1} title="先理解">
            <p>{chapter.plain.understand}</p>
          </Step>
          <Step n={2} title="找出核心观点">
            <blockquote className="font-serif text-2xl leading-snug text-pine">
              {chapter.plain.core}
            </blockquote>
          </Step>
          <Step n={3} title="重建逻辑">
            <ol className="space-y-3">
              {chapter.plain.logic.map((line, lineIndex) => (
                <li key={line} className="grid grid-cols-[1.5rem_1fr] gap-2">
                  <span className="font-semibold text-clay">{lineIndex + 1}</span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          </Step>
          <Step n={4} title="用简单语言表达">
            <div className="space-y-5">
              {chapter.plain.scenes.map((scene) => (
                <div key={scene.title}>
                  <h4 className="font-semibold text-ink">{scene.title}</h4>
                  <p className="mt-2">{scene.body}</p>
                </div>
              ))}
            </div>
          </Step>
          <Step n={5} title="检查你是否能快速理解">
            <p>
              先盖住答案，用自己的话说。说得出来，这一站才算走过。
            </p>
            <div className="mt-4 divide-y divide-line border-y border-line">
              {chapter.plain.checks.map((check, checkIndex) => (
                <details key={check.question} className="group py-3">
                  <summary className="cursor-pointer list-none font-semibold leading-relaxed [&::-webkit-details-marker]:hidden">
                    <span className="mr-2 text-clay">{checkIndex + 1}</span>
                    {check.question}
                    <span className="mt-1 block text-sm font-normal text-muted group-open:hidden">
                      我想好了，再看答案
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-ink">{check.answer}</p>
                </details>
              ))}
            </div>
          </Step>
        </ol>
      </section>

      <p className="mt-10 border-l-2 border-clay pl-4 font-serif text-xl leading-relaxed text-ink">
        {chapter.remember}
      </p>

      {chapter.glossary ? (
        <section className="mt-12" aria-labelledby="glossary-title">
          <h2 id="glossary-title" className="font-serif text-2xl">
            术语对照
          </h2>
          <dl className="mt-4 divide-y divide-line">
            {chapter.glossary.map((item) => (
              <div key={item.term} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr]">
                <dt className="font-semibold text-pine">{item.term}</dt>
                <dd className="leading-relaxed">{item.def}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <nav className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
        {prev ? (
          <Link
            href={chapterHref(prev.slug)}
            className={cn(buttonVariants({ variant: "outline" }), "justify-start")}
          >
            <ArrowLeft />
            {prev.navLabel}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={chapterHref(next.slug)} className={buttonVariants()}>
            {next.navLabel}
            <ArrowRight />
          </Link>
        ) : null}
      </nav>

      <footer className="mt-16 text-sm leading-relaxed text-muted">
        这是一份独立导读，用自己的话重述戴维·巴斯《进化心理学：心理的新科学》的框架，不是原书的替代，也与作者及出版社没有隶属关系。完整的论证、数据和研究争议，去读原书。解释不是许可。
      </footer>
    </article>
  );
}

function PrincipleStrip({ kind, current }: { kind: StripKind; current: number }) {
  const strip = STRIPS[kind];
  return (
    <ol className="mt-8 flex gap-2 overflow-x-auto pb-1" aria-label={`${strip.band}的位置`}>
      {strip.names.map((name, nameIndex) => {
        const index = nameIndex + 1;
        const active = index === current;
        return (
          <li
            key={name}
            className={
              active
                ? "min-w-28 bg-pine px-3 py-2 text-paper"
                : "min-w-28 border border-line px-3 py-2 text-muted"
            }
          >
            <span className="block text-xs">{strip.band}</span>
            <span className={active ? "text-sm font-semibold" : "text-sm"}>
              {index}. {name}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3">
      <span className="font-num text-3xl leading-none text-clay">{n}</span>
      <div className="leading-[1.9]">
        <h3 className="font-serif text-2xl leading-snug text-ink">{title}</h3>
        <div className="mt-3">{children}</div>
      </div>
    </li>
  );
}
