"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CarouselSlide = {
  title: string;
  text: string;
  image: string;
  alt: string;
  meta?: string;
};

export default function HomeCarousel({
  slides,
  interval = 6500,
}: {
  slides: CarouselSlide[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      interval,
    );
    return () => clearInterval(id);
  }, [paused, slides.length, interval]);

  const go = (next: number) => setIndex((next + slides.length) % slides.length);

  return (
    <section
      className="group relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        height: "clamp(360px, 42vw, 560px)",
        background: "var(--bg-deep)",
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      {/* Image stack — crossfade, fixed identical box for every slide */}
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            sizes="100vw"
            priority={i === 0}
            className="object-cover object-center"
          />
          {/* Cinematic overlays: vertical + left-side dark wash for legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,14,16,0.55) 0%, rgba(13,14,16,0.2) 35%, rgba(13,14,16,0.85) 92%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(13,14,16,0.85) 0%, rgba(13,14,16,0.35) 50%, rgba(13,14,16,0.05) 100%)",
            }}
          />
        </div>
      ))}

      {/* Content layer — same container width as the rest of the site */}
      <div className="relative z-10 flex h-full w-full items-end">
        <div
          className="mx-auto w-full pb-10 md:pb-14 lg:pb-16"
          style={{
            maxWidth: "var(--maxw-page)",
            paddingInline: "clamp(1.5rem, 3vw, 4rem)",
          }}
        >
          <div className="max-w-[820px]">
            {slides.map((slide, i) => {
              const active = i === index;
              return (
                <div
                  key={slide.title}
                  aria-hidden={!active}
                  className={`transition-all duration-700 ease-out ${
                    active
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none absolute -z-10 translate-y-3 opacity-0"
                  }`}
                >
                  <p
                    className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.24em]"
                    style={{ color: "var(--accent-strong)" }}
                  >
                    <span className="tabular text-white/65">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(slides.length).padStart(2, "0")}
                    </span>
                    {slide.meta ? (
                      <>
                        <span
                          className="h-px w-10"
                          style={{ background: "var(--accent)" }}
                        />
                        <span>{slide.meta}</span>
                      </>
                    ) : null}
                  </p>

                  <h3
                    className="mt-4 display-serif text-white"
                    style={{
                      fontSize: "clamp(2.4rem, 4.2vw, 4rem)",
                    }}
                  >
                    {slide.title}
                  </h3>

                  <p
                    className="mt-5 text-[17px] leading-[1.65] text-white/85 md:text-[19px]"
                    style={{ maxWidth: "62ch" }}
                  >
                    {slide.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Controls — bottom right */}
      <div
        className="absolute z-20 hidden items-center gap-2 md:flex"
        style={{
          right: "clamp(1.5rem, 3vw, 4rem)",
          bottom: "clamp(2rem, 3vw, 3rem)",
        }}
      >
        <button
          onClick={() => go(index - 1)}
          aria-label="Previous slide"
          className="flex h-12 w-12 items-center justify-center rounded-full backdrop-blur transition hover:bg-white/15"
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.06)",
            color: "white",
          }}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => go(index + 1)}
          aria-label="Next slide"
          className="flex h-12 w-12 items-center justify-center rounded-full backdrop-blur transition hover:bg-white/15"
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.06)",
            color: "white",
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Indicator bars — bottom left */}
      <div
        className="absolute z-20 hidden items-center gap-3 lg:flex"
        style={{
          left: "clamp(1.5rem, 3vw, 4rem)",
          bottom: "clamp(2.25rem, 3vw, 3.25rem)",
        }}
      >
        {slides.map((s, i) => (
          <button
            key={s.title}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="h-px transition-all duration-500"
            style={{
              width: i === index ? 64 : 28,
              background: i === index ? "var(--accent-strong)" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
