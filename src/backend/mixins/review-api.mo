import Types "../types/common";
import ReviewLib "../lib/review";
import OutCall "mo:caffeineai-http-outcalls/outcall";

module {
  let apiUrl = "https://caffeine-llm-gateway.xyz/v1/chat/completions";

  /// Generates a review by calling the external AI API via http-outcalls.
  public func generateReview(
    businessType : Types.BusinessType,
    rating : Types.Rating,
    transform : OutCall.Transform,
  ) : async Types.ReviewResult {
    let systemPrompt = ReviewLib.getSystemPrompt(businessType, rating);
    let requestBody = ReviewLib.buildRequestBody(systemPrompt);
    let headers : [OutCall.Header] = [
      { name = "Content-Type"; value = "application/json" },
    ];

    try {
      let responseText = await OutCall.httpPostRequest(apiUrl, headers, requestBody, transform);
      switch (ReviewLib.parseReviewFromResponse(responseText)) {
        case (?review) { #ok(review) };
        case null { #err("Could not parse the AI response. Please try again.") };
      };
    } catch (_) {
      #err("Unable to generate a review right now. Please try again in a moment.");
    };
  };
};
