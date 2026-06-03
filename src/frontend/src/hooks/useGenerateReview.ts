import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { BusinessType, StarRating } from "../types";

interface GenerateReviewParams {
  businessType: BusinessType;
  rating: StarRating;
}

interface ReviewResult {
  ok?: string;
  err?: string;
}

function toBackendBusinessType(
  type: BusinessType,
): { Cafe: null } | { OnlineBrand: null } | { SaaS: null } {
  if (type === "Cafe") return { Cafe: null };
  if (type === "OnlineBrand") return { OnlineBrand: null };
  return { SaaS: null };
}

export function useGenerateReview() {
  const { actor, isFetching } = useActor(createActor);

  return useMutation<string, Error, GenerateReviewParams>({
    mutationFn: async ({ businessType, rating }: GenerateReviewParams) => {
      if (!actor || isFetching) throw new Error("Backend not ready");

      const backendType = toBackendBusinessType(businessType);
      const result = await (
        actor as unknown as {
          generateReview: (
            businessType:
              | { Cafe: null }
              | { OnlineBrand: null }
              | { SaaS: null },
            rating: bigint,
          ) => Promise<ReviewResult>;
        }
      ).generateReview(backendType, BigInt(rating));

      if ("ok" in result && result.ok !== undefined) return result.ok;
      if ("err" in result && result.err !== undefined)
        throw new Error(result.err);
      throw new Error("Unexpected response format");
    },
  });
}
