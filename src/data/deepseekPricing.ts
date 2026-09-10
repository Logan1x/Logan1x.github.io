export type TokenRates = {
  cacheHit: number;
  input: number;
  output: number;
};

export type DeepSeekModel = {
  id: "flash" | "pro";
  name: string;
  shortName: string;
  modelId: string;
  offPeak: TokenRates;
  peak: TokenRates;
};

export const DEEPSEEK_MODELS: DeepSeekModel[] = [
  {
    id: "flash",
    name: "DeepSeek V4.1 Flash",
    shortName: "Flash 4.1",
    modelId: "deepseek-flash",
    offPeak: { cacheHit: 0.003, input: 0.15, output: 0.6 },
    peak: { cacheHit: 0.006, input: 0.3, output: 1.2 },
  },
  {
    id: "pro",
    name: "DeepSeek V4 Pro",
    shortName: "V4 Pro",
    modelId: "deepseek-v4-pro",
    offPeak: { cacheHit: 0.022, input: 0.66, output: 1.98 },
    peak: { cacheHit: 0.044, input: 1.32, output: 3.96 },
  },
];

/** 12:00 Beijing Time, 14 Sep 2026 (04:00 UTC). */
export const PRO_ROUTES_TO_FLASH_AT = Date.UTC(2026, 8, 14, 4, 0, 0);

export const OFFICIAL_PRICING_URL =
  "https://api-docs.deepseek.com/quick_start/pricing";

export function formatUsd(value: number): string {
  const digits = Number.isInteger(value * 100) ? 2 : 3;
  return `$${value.toFixed(digits)}`;
}

export function isUtcWeekend(date: Date): boolean {
  const day = date.getUTCDay();
  return day === 0 || day === 6;
}

export function isPeakUtc(date: Date): boolean {
  if (isUtcWeekend(date)) return false;
  const minutes =
    date.getUTCHours() * 60 +
    date.getUTCMinutes() +
    date.getUTCSeconds() / 60 +
    date.getUTCMilliseconds() / 60000;
  return (
    (minutes >= 60 && minutes < 240) || (minutes >= 360 && minutes < 600)
  );
}

function startOfUtcDay(date: Date, dayOffset: number): Date {
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate() + dayOffset,
      0,
      0,
      0,
      0
    )
  );
}

export function nextFlipUtc(from: Date): Date {
  for (let offset = 0; offset <= 8; offset += 1) {
    const day = startOfUtcDay(from, offset);
    if (isUtcWeekend(day)) continue;

    const y = day.getUTCFullYear();
    const m = day.getUTCMonth();
    const d = day.getUTCDate();
    const bounds = [
      Date.UTC(y, m, d, 1, 0, 0, 0),
      Date.UTC(y, m, d, 4, 0, 0, 0),
      Date.UTC(y, m, d, 6, 0, 0, 0),
      Date.UTC(y, m, d, 10, 0, 0, 0),
    ];

    for (const stamp of bounds) {
      if (stamp > from.getTime()) return new Date(stamp);
    }
  }

  return new Date(from.getTime() + 86_400_000);
}

export function formatRemaining(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return [hours, minutes, seconds]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
}

export function formatLocalStamp(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

export function proUsesFlashRates(date: Date): boolean {
  return date.getTime() >= PRO_ROUTES_TO_FLASH_AT;
}
