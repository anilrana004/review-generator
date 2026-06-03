import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw, Sparkles, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useGenerateReview } from "../hooks/useGenerateReview";
import {
  BUSINESS_TYPE_OPTIONS,
  type BusinessType,
  STAR_LABELS,
  type StarRating,
} from "../types";

export function ReviewGeneratorPage() {
  const [businessType, setBusinessType] = useState<BusinessType>("Cafe");
  const [rating, setRating] = useState<StarRating>(4);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    mutate,
    data: reviewText,
    isPending,
    error,
    reset,
  } = useGenerateReview();

  const displayedRating = hoveredStar ?? rating;

  const handleGenerate = () => mutate({ businessType, rating });

  const handleCopy = async () => {
    if (!reviewText) return;
    try {
      await navigator.clipboard.writeText(reviewText);
      setCopied(true);
      toast.success("Review copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy — please select and copy manually");
    }
  };

  const handleRegenerate = () => {
    reset();
    mutate({ businessType, rating });
  };

  return (
    <div className="flex-1 flex items-start justify-center px-4 py-10 md:py-16 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[640px]"
        data-ocid="review_generator.panel"
      >
        {/* Main card */}
        <div className="card-elevated p-6 md:p-8 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-[1.35rem] md:text-2xl font-semibold text-foreground tracking-tight leading-tight">
                Review Generator
              </h1>
              <p className="text-sm text-muted-foreground font-body mt-1 leading-snug">
                AI-crafted reviews tuned to your business and star rating
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-primary/10 border border-primary/25 text-xs font-display text-primary flex-shrink-0 mt-0.5">
              <Sparkles className="w-3 h-3" aria-hidden="true" />
              AI
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Business type */}
            <div className="space-y-2">
              <label
                htmlFor="business-type-select"
                className="block text-[11px] font-display uppercase tracking-widest text-muted-foreground"
              >
                Business type
              </label>
              <div
                className="relative"
                data-ocid="review_generator.business_type.select"
              >
                <select
                  id="business-type-select"
                  value={businessType}
                  onChange={(e) =>
                    setBusinessType(e.target.value as BusinessType)
                  }
                  className="w-full appearance-none bg-muted border border-border rounded-md px-3 py-2.5 text-sm font-body text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/70 transition-smooth hover:border-muted-foreground/40 pr-9"
                >
                  {BUSINESS_TYPE_OPTIONS.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className="bg-card text-foreground"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    className="w-4 h-4 text-muted-foreground"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Star rating */}
            <div className="space-y-2">
              <span
                className="block text-[11px] font-display uppercase tracking-widest text-muted-foreground"
                aria-hidden="true"
              >
                Star rating
              </span>
              <div
                className="flex items-center gap-2 bg-muted border border-border rounded-md px-3 h-[42px]"
                data-ocid="review_generator.star_rating"
              >
                <fieldset className="flex items-center gap-1">
                  <legend className="sr-only">Star rating</legend>
                  {([1, 2, 3, 4, 5] as StarRating[]).map((star) => (
                    <button
                      key={star}
                      type="button"
                      aria-label={`${star} star${star !== 1 ? "s" : ""}`}
                      aria-pressed={rating === star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(null)}
                      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded transition-transform duration-100 hover:scale-115 active:scale-95"
                      data-ocid={`review_generator.star.${star}`}
                    >
                      <Star
                        className={`w-5 h-5 transition-colors duration-150 ${
                          star <= displayedRating
                            ? "fill-primary text-primary"
                            : "fill-transparent text-border"
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </fieldset>
                <span className="text-xs text-muted-foreground font-body ml-auto pr-1">
                  {STAR_LABELS[rating]}
                </span>
              </div>
            </div>
          </div>

          {/* Output area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-display uppercase tracking-widest text-muted-foreground">
                Review
              </span>
              {reviewText && (
                <span className="text-[11px] text-muted-foreground font-body tabular-nums">
                  {reviewText.length} chars
                </span>
              )}
            </div>

            <div
              className="relative rounded-md border border-border bg-muted/30 overflow-hidden"
              style={{ minHeight: "160px" }}
              data-ocid="review_generator.output"
            >
              <AnimatePresence mode="wait">
                {isPending ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-5 space-y-3"
                    data-ocid="review_generator.loading_state"
                  >
                    {([100, 83, 67, 60] as const).map((w) => (
                      <div
                        key={w}
                        className="h-3 bg-muted-foreground/15 rounded animate-pulse"
                        style={{ width: `${w}%` }}
                      />
                    ))}
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center p-5"
                    data-ocid="review_generator.error_state"
                  >
                    <p className="text-sm text-destructive font-body text-center leading-relaxed">
                      {error.message ||
                        "Something went wrong. Try generating again."}
                    </p>
                  </motion.div>
                ) : reviewText ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="p-5"
                    data-ocid="review_generator.success_state"
                  >
                    <p className="text-[0.9375rem] font-body text-foreground/90 leading-[1.7] whitespace-pre-wrap">
                      {reviewText}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center p-5"
                    data-ocid="review_generator.empty_state"
                  >
                    <div className="text-center space-y-2.5">
                      <div className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center mx-auto">
                        <Sparkles
                          className="w-4 h-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground font-body leading-snug">
                        Choose your business type and rating,
                        <br />
                        then click Generate.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action row — always at bottom of card */}
          <div className="flex items-center justify-end gap-2 pt-1">
            {reviewText && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-1.5 font-body text-sm transition-smooth h-9 px-4"
                data-ocid="review_generator.copy_button"
                aria-label="Copy review to clipboard"
              >
                {copied ? (
                  <Check
                    className="w-3.5 h-3.5 text-primary"
                    aria-hidden="true"
                  />
                ) : (
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                )}
                {copied ? "Copied!" : "Copy"}
              </Button>
            )}

            <Button
              onClick={reviewText ? handleRegenerate : handleGenerate}
              disabled={isPending}
              size="sm"
              className="gap-1.5 font-body text-sm bg-primary text-primary-foreground hover:bg-primary/85 transition-smooth h-9 px-5 font-medium"
              data-ocid={
                reviewText
                  ? "review_generator.regenerate_button"
                  : "review_generator.generate_button"
              }
            >
              {isPending ? (
                <>
                  <RefreshCw
                    className="w-3.5 h-3.5 animate-spin"
                    aria-hidden="true"
                  />
                  Generating…
                </>
              ) : reviewText ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                  Generate Again
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Hint strip */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-center text-xs text-muted-foreground font-body mt-4"
        >
          Each review is uniquely generated — hit Generate Again for a fresh
          take
        </motion.p>
      </motion.div>
    </div>
  );
}
