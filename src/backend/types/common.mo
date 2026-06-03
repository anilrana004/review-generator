module {
  public type Rating = Nat; // 1–5

  public type BusinessType = {
    #Cafe;
    #OnlineBrand;
    #SaaS;
  };

  public type ReviewResult = {
    #ok : Text;
    #err : Text;
  };
};
