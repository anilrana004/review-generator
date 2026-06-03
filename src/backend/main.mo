import OutCall "mo:caffeineai-http-outcalls/outcall";
import Types "types/common";
import ReviewLib "mixins/review-api";

actor {
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public func generateReview(
    businessType : Types.BusinessType,
    rating : Types.Rating,
  ) : async Types.ReviewResult {
    await ReviewLib.generateReview(businessType, rating, transform);
  };
};
