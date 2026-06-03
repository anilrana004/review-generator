import type { backendInterface } from "../backend";
import { BusinessType } from "../backend";

export const mockBackend: backendInterface = {
  generateReview: async (businessType: BusinessType, rating: bigint) => {
    await new Promise((r) => setTimeout(r, 800));
    const reviews: Record<string, Record<string, string>> = {
      [BusinessType.Cafe]: {
        "1": "Caffeine.ai had so much promise but the espresso arrived cold and the wait was close to 25 minutes on a Tuesday morning. The space looked great on Instagram — reality didn't match.",
        "2": "The pour-over was decent but nothing to write home about. Service felt rushed and distracted. Not sure the specialty markup is justified yet.",
        "3": "Solid neighborhood café. Coffee was consistent, Wi-Fi held up for a two-hour work session. Wouldn't seek it out, but would come back if nearby.",
        "4": "The oat flat white was genuinely excellent — smooth, well-balanced, not overly sweet. Would have been five stars but the seating near the door gets loud during rush hour.",
        "5": "Found my new work-from-home escape. The barista walked me through three single-origin options and the one she picked was exactly right. Already blocking Thursday mornings here.",
      },
      [BusinessType.OnlineBrand]: {
        "1": "The AI promised a light floral roast based on my preferences and sent something dark and smoky instead. Wrong order, late by a week. Not coming back.",
        "2": "Beans arrived on time and packaging was fine, but the recommendation felt off — too acidic for the profile I set up. Maybe the AI needs more calibration.",
        "3": "Everything was exactly as described. Beans were fresh, flavor notes printed on the bag matched what was in the cup. Nothing surprising, which is fine.",
        "4": "The Ethiopia Yirgacheffe they recommended was a great call — bright, clean, exactly my style. Slight delay on shipping but customer support responded fast.",
        "5": "Completely converted. The AI nailed my preference on the first try and the beans arrived two days later, sealed perfectly. Already resubscribed for next month.",
      },
      [BusinessType.SaaS]: {
        "1": "The focus timer desynced with my Google Calendar and I missed a client call. That's the core feature — if it doesn't work, nothing else matters.",
        "2": "Some potential here but the distraction blocker kept triggering on sites I needed for work. Too blunt for daily use until the AI gets smarter.",
        "3": "Does what it says. Focus sessions work, streaks are a nice nudge. The AI suggestions feel pretty generic so far. Worth the free tier, not sure about Pro.",
        "4": "The deep work scheduling is genuinely useful — it found gaps in my calendar I didn't know existed. Recommended it to a colleague. One wish: a Notion integration.",
        "5": "Three weeks in and my output has measurably changed. The AI learns fast — by day five it was scheduling my best work hours before I even thought about them. Nothing else comes close.",
      },
    };

    const ratingKey = String(Number(rating));
    const businessReviews = reviews[businessType] ?? reviews[BusinessType.Cafe];
    const reviewText = businessReviews[ratingKey] ?? businessReviews["3"];

    return { __kind__: "ok", ok: reviewText };
  },

  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: input.response.headers,
  }),
};
