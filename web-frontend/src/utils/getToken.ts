export function getMaxTokens(plan: string): number {
  switch (plan) {
    case "PLUS":
      return 10000;
    case "PRO":
      return 50000;
    default:
      return 1000;
  }
}
