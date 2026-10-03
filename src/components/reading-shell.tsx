import type { ReactNode } from "react";
import Link from "next/link";
import { chapterGroups, chapterHref, chapters } from "@/content/book";
import { ThemeSwitcher } from "@/components/theme-switcher";

const groups = chapterGroups();

export function ReadingShell({
  currentSlug,
  children,
}: {
  currentSlug: string;
  children: ReactNode;
}) {
  const current = chapters.find((chapter) => chapter.slug === currentSlug);

  return (
    <div className="min-h-full lg:grid lg:grid-cols-[17.5rem_minmax(0,1fr)]">
      <a
        href="#chapter"
        className="sr-only focus:not-sr-only focus:absolute focus:z-20 focus:bg-pine focus:px-4 focus:py-2 focus:text-paper"
      >
        跳到正文
      </a>
      <aside className="border-b border-line bg-paper lg:sticky lg:top-0 lg:h-svh lg:overflow-y-auto lg:border-r lg:border-b-0">
        <div className="px-5 py-6">
          <Link href="/" className="block">
            <p className="font-serif text-2xl text-pine">进化心理学</p>
            <p className="mt-1 font-kai text-sm leading-relaxed text-muted">
              把戴维·巴斯的《进化心理学》按原书的路讲清楚
            </p>
          </Link>
          <ThemeSwitcher />
        </div>
        <details className="border-t border-line px-5 py-3 lg:hidden">
          <summary className="cursor-pointer text-sm font-semibold">
            目录 · {current?.navLabel}
          </summary>
          <ChapterIndex currentSlug={currentSlug} />
        </details>
        <div className="hidden px-3 pb-10 lg:block">
          <ChapterIndex currentSlug={currentSlug} />
        </div>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function ChapterIndex({ currentSlug }: { currentSlug: string }) {
  return (
    <nav aria-label="章节" className="py-4">
      {groups.map((group) => (
        <div key={group.label} className="mb-5">
          <p className="px-2 text-xs font-semibold tracking-wide text-muted">
            {group.label}
          </p>
          <ol className="mt-1">
            {group.chapters.map((chapter) => {
              const active = chapter.slug === currentSlug;
              return (
                <li key={chapter.slug}>
                  <Link
                    href={chapterHref(chapter.slug)}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? "block border-l-2 border-pine bg-pine-soft px-3 py-2 text-sm font-semibold text-pine"
                        : "block border-l-2 border-transparent px-3 py-2 text-sm text-ink hover:border-line hover:bg-band/60"
                    }
                  >
                    {chapter.navLabel}
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </nav>
  );
}
