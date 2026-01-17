export type SignalLevel = "LOW" | "MEDIUM" | "HIGH";

export type Signal = {
  id: string;
  title: string;
  description: string;
  level: SignalLevel;
  metric: string;
  evidence: string;
};

export function detectSignals(input: {
  revenueTrendPct: number;
  costTrendPct: number;
  marginTrendPct: number;
  topRegionDependencyPct: number;
}): Signal[] {
  const signals: Signal[] = [];

  if (input.marginTrendPct < 0) {
    signals.push({
      id: "margin_pressure",
      title: "Margin pressure detected",
      description:
        "Operating margins are declining despite revenue movement.",
      level: "HIGH",
      metric: "Margin %",
      evidence: `Margin change ${input.marginTrendPct}%`,
    });
  }

  if (input.costTrendPct > input.revenueTrendPct) {
    signals.push({
      id: "cost_outpacing_revenue",
      title: "Costs growing faster than revenue",
      description:
        "Operating costs are increasing faster than topline growth.",
      level: "MEDIUM",
      metric: "Cost vs Revenue",
      evidence: `Cost +${input.costTrendPct}%, Revenue +${input.revenueTrendPct}%`,
    });
  }

  if (input.topRegionDependencyPct > 45) {
    signals.push({
      id: "region_concentration",
      title: "Revenue concentration risk",
      description:
        "Revenue dependency on a single region exceeds safe threshold.",
      level: "MEDIUM",
      metric: "Region Dependency",
      evidence: `Top region ${input.topRegionDependencyPct}%`,
    });
  }

  return signals;
}

