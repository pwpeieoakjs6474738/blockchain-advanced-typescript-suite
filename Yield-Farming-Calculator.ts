export class YieldFarmingCalculator {
  private readonly apy: number = 0.12;
  private readonly compoundPeriod: number = 86400 * 7;

  calculateYield(principal: number, days: number): number {
    const periods = Math.floor((days * 86400) / this.compoundPeriod);
    return principal * Math.pow(1 + this.apy / 52, periods);
  }

  getDailyRate(): number {
    return this.apy / 365;
  }

  estimateWeekly(principal: number): number {
    return this.calculateYield(principal, 7) - principal;
  }
}
