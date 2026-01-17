import { Signal } from "./signals";

export type Insight = {
  headline: string;
  whyThisMatters: string;
  recommendedDecision: string;
};

export function generateInsights(signals: Signal[]): Insight[] {
  return signals.map((signal) => {
    switch (signal.id) {
      case "margin_pressure":
        return {
          headline: "Operating leverage is weakening",
          whyThisMatters:
            "If this trend continues, operating margins may decline further over the next 1–2 quarters, impacting profitability and forecast reliability.",
          recommendedDecision:
            "Freeze discretionary spending and initiate renegotiation with the most cost-intensive vendors.",
        };

      case "cost_outpacing_revenue":
        return {
          headline: "Cost structure efficiency risk emerging",
          whyThisMatters:
            "Rising operating costs without proportional revenue growth erodes operating leverage.",
          recommendedDecision:
            "Conduct a cost elasticity review to identify fixed vs variable cost pressure points.",
        };

      case "region_concentration":
        return {
          headline: "Geographic revenue concentration increasing risk exposure",
          whyThisMatters:
            "Over-reliance on a single region increases vulnerability to localized demand or operational shocks.",
          recommendedDecision:
            "Accelerate revenue diversification across secondary regions.",
        };

      default:
        return {
          headline: signal.title,
          whyThisMatters: signal.description,
          recommendedDecision: "Review underlying drivers.",
        };
    }
  });
}

