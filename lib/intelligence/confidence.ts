export type ConfidenceLevel = "High" | "Medium" | "Low";

export function computeConfidence(input: {
  dataCompletenessPct: number;
  trendConsistencyPct: number;
}): ConfidenceLevel {
  if (input.dataCompletenessPct >= 90 && input.trendConsistencyPct >= 75) {
    return "High";
  }

  if (input.dataCompletenessPct >= 70) {
    return "Medium";
  }

  return "Low";
}

