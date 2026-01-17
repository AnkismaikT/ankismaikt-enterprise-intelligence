export type Scenario = {
  title: string;
  bulletPoints: string[];
  estimatedImpact: string;
};

export function buildScenarios(input: {
  marginExposureCr: number;
}) {
  return {
    noIntervention: {
      title: "If No Intervention",
      bulletPoints: [
        "Margin trend continues to decline",
        "Pressure becomes visible in reported financials",
      ],
      estimatedImpact: `₹${input.marginExposureCr}–₹${(
        input.marginExposureCr * 1.5
      ).toFixed(1)} Cr erosion`,
    },
    stabilization: {
      title: "If Stabilization Achieved",
      bulletPoints: [
        "Margin trend stabilizes or improves",
        "Profitability flexibility preserved",
      ],
      estimatedImpact: `₹${(
        input.marginExposureCr * 0.5
      ).toFixed(1)}–₹${input.marginExposureCr} Cr protected`,
    },
  };
}

