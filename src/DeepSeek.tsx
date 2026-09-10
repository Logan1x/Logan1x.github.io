import { Link } from "react-router-dom";
import {
  DEEPSEEK_MODELS,
  OFFICIAL_PRICING_URL,
  formatUsd,
  proUsesFlashRates,
  type DeepSeekModel,
  type TokenRates,
} from "./data/deepseekPricing";
import { useDeepSeekClock } from "./hooks/useDeepSeekClock";
import { usePageMeta } from "./hooks/usePageMeta";
import { useEffect } from "react";

const PAGE_URL = "https://khushal.work/deepseek";
const PAGE_TITLE = "DeepSeek V4.1 Flash Pricing | Peak & Off-Peak Clock";
const PAGE_DESCRIPTION =
  "Live DeepSeek API price clock. See if you are in peak or off-peak hours and compare DeepSeek V4.1 Flash and V4 Pro rates per 1M tokens.";

const NAV_LINKS = [
  { label: "home", to: "/" },
  { label: "projects", to: "/artifacts" },
  { label: "github", href: "https://github.com/logan1x" },
  { label: "linkedin", href: "https://linkedin.com/in/logan1x" },
] as const;

const navClassName =
  "inline-flex min-h-10 items-center text-lg text-gray-400 hover:text-gray-700 transition-colors duration-200";

function ratesFor(model: DeepSeekModel, isPeak: boolean): TokenRates {
  return isPeak ? model.peak : model.offPeak;
}

function DeepSeek() {
  const clock = useDeepSeekClock();
  const flashBilled = proUsesFlashRates(clock.now);

  usePageMeta({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    keywords:
      "DeepSeek pricing, DeepSeek V4.1 Flash price, DeepSeek off-peak, DeepSeek API cost, DeepSeek peak hours, deepseek-flash",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "deepseek-jsonld";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: PAGE_URL,
      author: {
        "@type": "Person",
        name: "Khushal Sharma",
        url: "https://khushal.work",
      },
      mainEntity: {
        "@type": "Table",
        about: "DeepSeek API peak and off-peak prices per 1M tokens",
      },
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto min-h-screen py-6 relative">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-50"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(75, 85, 99, 0.08) 79px, rgba(75, 85, 99, 0.08) 80px, transparent 80px, transparent 159px, rgba(75, 85, 99, 0.08) 159px, rgba(75, 85, 99, 0.08) 160px),
            repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(75, 85, 99, 0.08) 79px, rgba(75, 85, 99, 0.08) 80px, transparent 80px, transparent 159px, rgba(75, 85, 99, 0.08) 159px, rgba(75, 85, 99, 0.08) 160px),
            radial-gradient(circle at 80px 80px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
            radial-gradient(circle at 160px 160px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
          `,
          backgroundSize: "160px 160px, 160px 160px, 160px 160px, 160px 160px",
        }}
      />

      <nav
        aria-label="Site"
        className="relative z-10 flex flex-wrap items-center justify-center gap-x-5"
      >
        {NAV_LINKS.map((link) =>
          "to" in link ? (
            <Link key={link.label} to={link.to} className={navClassName}>
              {link.label}
            </Link>
          ) : (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={navClassName}
            >
              {link.label}
            </a>
          )
        )}
      </nav>

      <article className="relative z-10 mt-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border-2 border-[#eeeeec]">
        <header className="mb-6">
          <h1 className="text-3xl tracking-tight leading-tight font-medium text-balance">
            DeepSeek price clock
          </h1>
          <p className="mt-3 text-pretty text-gray-600">
            Off-peak is half price. This page shows whether DeepSeek is cheap
            right now in your timezone, plus V4.1 Flash and V4 Pro rates.
          </p>
        </header>

        <section
          aria-live="polite"
          className="rounded-xl px-4 py-5 sm:px-5"
          style={{
            backgroundColor: clock.isPeak
              ? "rgba(235, 72, 136, 0.08)"
              : "rgba(36, 208, 90, 0.1)",
          }}
        >
          <p
            className="text-sm uppercase tracking-wide"
            style={{ color: clock.isPeak ? "#eb4888" : "#1a9a45" }}
          >
            {clock.isPeak ? "Peak" : "Off-peak"}
          </p>
          <p className="mt-1 text-3xl tabular-nums tracking-tight">
            {clock.remaining}{" "}
            <span className="text-lg text-gray-500">left</span>
          </p>
          <p className="mt-2 text-pretty text-gray-600">
            {clock.isPeak ? "Off-peak" : "Peak"} starts {clock.nextFlipLocal}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-sm uppercase tracking-wide text-gray-500">
            Now · per 1M tokens
          </h2>
          <ul className="mt-3 divide-y divide-black/6">
            {DEEPSEEK_MODELS.map((model) => {
              const rates = ratesFor(model, clock.isPeak);
              const billedAsFlash = model.id === "pro" && flashBilled;
              return (
                <li
                  key={model.id}
                  className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <div>
                    <p className="font-medium">{model.name}</p>
                    <p className="text-sm text-gray-500">{model.modelId}</p>
                  </div>
                  <p className="tabular-nums text-gray-800">
                    {billedAsFlash ? (
                      <span className="text-gray-500">Flash rates</span>
                    ) : (
                      <>
                        <span className="text-gray-500">in</span>{" "}
                        {formatUsd(rates.input)}
                        <span className="mx-2 text-gray-300">·</span>
                        <span className="text-gray-500">out</span>{" "}
                        {formatUsd(rates.output)}
                      </>
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-8 space-y-6">
          <h2 className="text-sm uppercase tracking-wide text-gray-500">
            All rates · per 1M tokens
          </h2>
          {DEEPSEEK_MODELS.map((model) => {
            const rows = [
              {
                label: "cache hit",
                off: model.offPeak.cacheHit,
                peak: model.peak.cacheHit,
              },
              {
                label: "input",
                off: model.offPeak.input,
                peak: model.peak.input,
              },
              {
                label: "output",
                off: model.offPeak.output,
                peak: model.peak.output,
              },
            ];
            return (
              <table key={model.id} className="w-full text-left text-sm">
                <caption className="mb-2 text-left font-medium text-base text-gray-900">
                  {model.name}
                </caption>
                <thead>
                  <tr className="border-b border-black/10 text-gray-500">
                    <th scope="col" className="py-2 pr-3 font-medium">
                      Token
                    </th>
                    <th
                      scope="col"
                      className={`py-2 pr-3 font-medium tabular-nums text-right ${
                        clock.isPeak ? "" : "text-[#1a9a45]"
                      }`}
                    >
                      Off-peak
                    </th>
                    <th
                      scope="col"
                      className={`py-2 font-medium tabular-nums text-right ${
                        clock.isPeak ? "text-[#eb4888]" : ""
                      }`}
                    >
                      Peak
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label} className="border-b border-black/5">
                      <th
                        scope="row"
                        className="py-2 pr-3 font-normal text-gray-600"
                      >
                        {row.label}
                      </th>
                      <td
                        className={`py-2 pr-3 tabular-nums text-right ${
                          clock.isPeak ? "text-gray-500" : ""
                        }`}
                      >
                        {formatUsd(row.off)}
                      </td>
                      <td
                        className={`py-2 tabular-nums text-right ${
                          clock.isPeak ? "" : "text-gray-500"
                        }`}
                      >
                        {formatUsd(row.peak)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          })}
        </section>

        <footer className="mt-8 space-y-3 text-pretty text-sm text-gray-500">
          <p>
            Peak hours are 01:00–04:00 and 06:00–10:00 UTC, Monday through
            Friday. Every other hour, and all of Saturday and Sunday, is
            off-peak. Input is cache miss.
          </p>
          <p>
            V4 Pro keeps its own rates until 12:00 Beijing Time on 14 Sep 2026,
            then routes to V4.1 Flash and bills at Flash rates. Legacy names
            <code className="mx-1 text-gray-700">deepseek-v4-flash</code>
            and
            <code className="mx-1 text-gray-700">
              deepseek-v4-flash-vision-exp
            </code>
            are served by V4.1 Flash.
          </p>
          <p>
            Rates from the{" "}
            <a
              href={OFFICIAL_PRICING_URL}
              target="_blank"
              rel="noreferrer"
              className="text-gray-800 underline decoration-2 underline-offset-2 decoration-[#10a2f5] hover:text-gray-500 transition-colors duration-200"
            >
              official DeepSeek pricing page
            </a>
            .
          </p>
        </footer>
      </article>
    </div>
  );
}

export default DeepSeek;
