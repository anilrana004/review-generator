import Text "mo:core/Text";
import Types "../types/common";

module {
  /// Returns the full system prompt text for the given business type and star rating.
  public func getSystemPrompt(businessType : Types.BusinessType, rating : Types.Rating) : Text {
    let ratingText = switch (rating) {
      case (1) { "1" };
      case (2) { "2" };
      case (3) { "3" };
      case (4) { "4" };
      case (_) { "5" };
    };

    switch (businessType) {
      case (#Cafe) {
        "You are a review assistant for Caffeine.ai, a modern specialty coffee café known for its artisan brews, fast Wi-Fi, and productivity-friendly atmosphere.\n\nA customer just visited and rated their experience " # ratingText # " out of 5 stars.\n\nWHAT CAFFEINE.AI IS KNOWN FOR (weave in naturally based on context):\n- Specialty espresso drinks and single-origin pour-overs\n- Fast, reliable Wi-Fi — popular with remote workers and students\n- Minimalist, aesthetic interior with good natural lighting\n- Friendly, knowledgeable baristas\n- Fair pricing for the quality\n- Quick service even during busy hours\n\nTONE GUIDE FOR " # ratingText # "/5 STARS:\n1 star → The customer is genuinely frustrated. Something specific went wrong — cold coffee, extremely long wait, rude staff, or wrong order. They're disappointed because they had higher expectations from a place called Caffeine.ai. Will not return soon.\n\n2 stars → Disappointed but not furious. The coffee was okay but something — service, ambiance, or value — didn't match the hype. Not sure if they'll give it another chance.\n\n3 stars → Average visit. Coffee was decent, nothing stood out positively or negatively. Maybe a bit slow, or the space was crowded. Would return but wouldn't rave about it to anyone.\n\n4 stars → Really enjoyed it. Specific thing impressed them — great latte, awesome atmosphere for working, excellent barista recommendation. One small thing could improve (parking, seating, a specific item). Will recommend to friends and return.\n\n5 stars → Completely sold. Mentions something vivid and specific — best flat white they've had, found their new work-from-café spot, barista made their day, or the space had a creative energy they loved. Will tell everyone. Already planning next visit.\n\nWRITING RULES — follow every single one:\n→ NEVER start with \"I\" — open with an observation, the café name, a feeling, or a noun\n→ NEVER use: \"Great experience!\", \"Highly recommend!\", \"Amazing!\", \"Five stars!\"\n→ NEVER mention the star number or rating in the review text\n→ Sound like a real human — use contractions, natural rhythm, slight informality\n→ Reference something SPECIFIC to a coffee café (drink name, atmosphere, wait, barista)\n→ 2 to 4 sentences MAXIMUM — do not write more\n→ No hashtags, no emojis, no marketing language\n\nOUTPUT: Only the review text. No quotes around it. No intro. No explanation."
      };
      case (#OnlineBrand) {
        "You are a review assistant for Caffeine.ai, a premium online coffee brand that uses AI to personalize coffee subscriptions and roast recommendations.\n\nA customer just made a purchase and rated their experience " # ratingText # " out of 5 stars.\n\nWHAT CAFFEINE.AI IS KNOWN FOR (weave in naturally):\n- AI-curated coffee bean subscriptions based on taste preference\n- Single-origin and specialty roasts\n- Fast and well-packaged shipping\n- Freshly roasted beans dispatched within 24 hours\n- Helpful flavor notes and brew guides included\n- Responsive customer support\n\nTONE GUIDE FOR " # ratingText # "/5 STARS:\n1 star → Order issue: wrong item, late delivery, stale beans, or poor packaging. Customer feels let down specifically because this is marketed as \"AI-personalized\" but got something totally off. Not coming back.\n\n2 stars → The coffee arrived but wasn't what was expected from the AI recommendation. Shipping was fine but the roast/flavor profile didn't match their taste. Might try once more but skeptical.\n\n3 stars → Fine. Coffee was okay, packaging decent, delivery on time. The AI recommendations felt generic. Nothing special, nothing wrong.\n\n4 stars → Good experience. Beans were fresh, flavor profile matched well. Packaging was solid. Would reorder. Small thing — maybe a slightly off recommendation or minor shipping delay.\n\n5 stars → Blown away by how accurate the recommendation was. Freshest coffee they've ever received by mail. Packaging premium. Already resubscribed or planning to. Converted from skeptic to believer.\n\nWRITING RULES:\n→ NEVER start with \"I\"\n→ NEVER use: \"Great experience!\", \"Highly recommend!\", \"Amazing service!\"\n→ NEVER mention the star number in the text\n→ Reference something specific: beans, roast level, flavor notes, packaging, AI recommendation\n→ Sound like a real online shopper — natural, informal, authentic\n→ 2 to 4 sentences MAXIMUM\n\nOUTPUT: Only the review text. No quotes. No intro. No explanation."
      };
      case (#SaaS) {
        "You are a review assistant for Caffeine.ai, an AI-powered productivity and focus tool used by remote workers, developers, and creators.\n\nA user just rated their experience with Caffeine.ai " # ratingText # " out of 5 stars.\n\nWHAT CAFFEINE.AI IS KNOWN FOR (weave in naturally):\n- AI-powered focus sessions and deep work scheduling\n- Distraction blocking with smart context awareness\n- Integrations with Notion, Slack, Google Calendar\n- Clean, minimal UI that doesn't get in the way\n- Daily productivity insights and streaks\n- Free tier available, Pro plan for power users\n\nTONE GUIDE FOR " # ratingText # "/5 STARS:\n1 star → Frustrated user. Something core broke — sync issues, lost data, notifications not working, or misleading AI suggestions. Switched to a competitor. Feels the product didn't deliver on its promise.\n\n2 stars → Has potential but fell short. One or two real bugs or missing features made it annoying to use daily. Not worth the Pro upgrade yet.\n\n3 stars → Does the job. Nothing groundbreaking. Works fine but doesn't feel different from other focus tools. The AI feels basic. Might stick around.\n\n4 stars → Genuinely improved their workflow. Specific feature (focus timer, calendar AI, distraction blocker) stands out. Minor UX friction or a feature they wish existed. Recommended to a colleague.\n\n5 stars → This tool changed how they work. Specific and vivid — mentions the exact feature that hooked them. Has been using it daily for a while. Recommends it without hesitation to anyone who struggles with focus.\n\nWRITING RULES:\n→ NEVER start with \"I\"\n→ NEVER use: \"Great tool!\", \"Highly recommend!\", \"Game changer!\" as openers\n→ NEVER mention the star number in the text\n→ Reference something specific: a feature, the AI, the UI, integrations, pricing\n→ Sound like a real tech user — direct, opinionated, authentic\n→ 2 to 4 sentences MAXIMUM\n\nOUTPUT: Only the review text. No quotes. No intro. No explanation."
      };
    };
  };

  /// Builds the JSON request body for the AI API call.
  public func buildRequestBody(systemPrompt : Text) : Text {
    let escapedPrompt = escapeJson(systemPrompt);
    "{\"model\":\"google/gemini-2.0-flash-001\",\"max_tokens\":200,\"messages\":[{\"role\":\"system\",\"content\":\"" # escapedPrompt # "\"},{\"role\":\"user\",\"content\":\"Write the review now.\"}]}"
  };

  /// Parses the raw AI API response and extracts the review text.
  /// The response is a JSON string from the OpenAI-compatible chat completions API.
  /// We extract the content field from choices[0].message.content by naive string search.
  public func parseReviewFromResponse(responseText : Text) : ?Text {
    // Look for "content":" pattern and extract until the next unescaped quote sequence
    let marker = "\"content\":\"";
    switch (findSubstring(responseText, marker)) {
      case null { null };
      case (?startIdx) {
        let contentStart = startIdx + marker.size();
        let afterMarker = textDrop(responseText, contentStart);
        let extracted = extractUntilEndQuote(afterMarker);
        if (extracted == "") { null } else { ?(unescapeJson(extracted)) };
      };
    };
  };

  // ── Private helpers ────────────────────────────────────────────────────────

  /// Escapes a text string for embedding inside a JSON string value.
  func escapeJson(text : Text) : Text {
    var result = "";
    for (c in text.chars()) {
      result #= switch (c) {
        case ('\"') { "\\\"" };
        case ('\\') { "\\\\" };
        case ('\n') { "\\n" };
        case ('\r') { "\\r" };
        case ('\t') { "\\t" };
        case (_) { Text.fromChar(c) };
      };
    };
    result
  };

  /// Unescapes common JSON string escape sequences.
  func unescapeJson(text : Text) : Text {
    var result = "";
    var chars = text.chars();
    label l loop {
      switch (chars.next()) {
        case null { break l };
        case (? '\\') {
          switch (chars.next()) {
            case (? '\"') { result #= "\"" };
            case (? '\\') { result #= "\\" };
            case (? 'n') { result #= "\n" };
            case (? 'r') { result #= "\r" };
            case (? 't') { result #= "\t" };
            case (?c) { result #= "\\" # Text.fromChar(c) };
            case null { break l };
          };
        };
        case (?c) { result #= Text.fromChar(c) };
      };
    };
    result
  };

  /// Extracts characters from the start of `text` until an unescaped `"` is found.
  func extractUntilEndQuote(text : Text) : Text {
    var result = "";
    var escaped = false;
    for (c in text.chars()) {
      if (escaped) {
        result #= Text.fromChar(c);
        escaped := false;
      } else if (c == '\\') {
        result #= "\\";
        escaped := true;
      } else if (c == '\"') {
        return result;
      } else {
        result #= Text.fromChar(c);
      };
    };
    result
  };

  /// Returns the byte index of the first occurrence of `needle` inside `haystack`, or null.
  func findSubstring(haystack : Text, needle : Text) : ?Nat {
    let hSize = haystack.size();
    let nSize = needle.size();
    if (nSize == 0) { return ?0 };
    if (nSize > hSize) { return null };

    let hChars = haystack.toArray();
    let nChars = needle.toArray();

    var i = 0;
    label outer while (i + nSize <= hSize) {
      var j = 0;
      var matched = true;
      label inner while (j < nSize) {
        if (hChars[i + j] != nChars[j]) {
          matched := false;
          break inner;
        };
        j += 1;
      };
      if (matched) { return ?i };
      i += 1;
    };
    null
  };

  /// Drops the first `n` characters from a Text.
  func textDrop(text : Text, n : Nat) : Text {
    var count = 0;
    var result = "";
    for (c in text.chars()) {
      if (count >= n) { result #= Text.fromChar(c) };
      count += 1;
    };
    result
  };
};
