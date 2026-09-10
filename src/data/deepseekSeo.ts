export const DEEPSEEK_PAGE_URL = "https://khushal.work/deepseek";

export const DEEPSEEK_PAGE_TITLE =
  "DeepSeek V4.1 Flash Price — Peak & Off-Peak API Clock";

export const DEEPSEEK_PAGE_DESCRIPTION =
  "DeepSeek V4.1 Flash is $0.15 input and $0.60 output per 1M tokens off-peak, $0.30 / $1.20 at peak. Live clock for weekday UTC peak hours. Weekends are off-peak.";

export const DEEPSEEK_PAGE_KEYWORDS =
  "DeepSeek V4.1 Flash price, DeepSeek API pricing, DeepSeek off-peak hours, DeepSeek peak hours, deepseek-flash cost, DeepSeek V4 Pro price, DeepSeek API cost 2026";

export const DEEPSEEK_FAQS = [
  {
    question: "When is DeepSeek off-peak?",
    answer:
      "DeepSeek is off-peak all day Saturday and Sunday, and on weekdays outside 01:00–04:00 and 06:00–10:00 UTC. Off-peak rates are half of peak.",
  },
  {
    question: "How much does DeepSeek V4.1 Flash cost?",
    answer:
      "Per 1M tokens, V4.1 Flash is $0.003 cache hit, $0.15 input, and $0.60 output off-peak. Peak is $0.006, $0.30, and $1.20. Use the model id deepseek-flash.",
  },
  {
    question: "How much does DeepSeek V4 Pro cost?",
    answer:
      "Per 1M tokens, V4 Pro is $0.022 cache hit, $0.66 input, and $1.98 output off-peak. Peak is $0.044, $1.32, and $3.96. From 12:00 Beijing Time on 14 Sep 2026, deepseek-v4-pro routes to V4.1 Flash at Flash rates.",
  },
  {
    question: "Is DeepSeek cheaper on weekends?",
    answer:
      "Yes. Saturday and Sunday are off-peak all day, so DeepSeek API calls cost half of weekday peak rates.",
  },
] as const;

export function getDeepSeekJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${DEEPSEEK_PAGE_URL}#page`,
        url: DEEPSEEK_PAGE_URL,
        name: DEEPSEEK_PAGE_TITLE,
        description: DEEPSEEK_PAGE_DESCRIPTION,
        inLanguage: "en",
        isPartOf: {
          "@type": "WebSite",
          name: "Khushal Sharma",
          url: "https://khushal.work",
        },
        author: {
          "@type": "Person",
          name: "Khushal Sharma",
          url: "https://khushal.work",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://khushal.work/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "DeepSeek pricing",
            item: DEEPSEEK_PAGE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: DEEPSEEK_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  });
}
