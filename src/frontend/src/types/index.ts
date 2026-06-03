export type BusinessType = "Cafe" | "OnlineBrand" | "SaaS";

export type StarRating = 1 | 2 | 3 | 4 | 5;

export interface BusinessTypeOption {
  value: BusinessType;
  label: string;
  description: string;
}

export const BUSINESS_TYPE_OPTIONS: BusinessTypeOption[] = [
  {
    value: "Cafe",
    label: "Physical Café",
    description: "Coffee shop or café with in-person visits",
  },
  {
    value: "OnlineBrand",
    label: "Online Coffee Brand",
    description: "D2C brand, subscriptions, or online store",
  },
  {
    value: "SaaS",
    label: "SaaS / Tech Product",
    description: "Software tool, app, or AI-powered service",
  },
];

export const STAR_LABELS: Record<StarRating, string> = {
  1: "Very Poor",
  2: "Disappointing",
  3: "Average",
  4: "Good",
  5: "Excellent",
};
