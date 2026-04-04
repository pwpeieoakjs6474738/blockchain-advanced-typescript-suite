export class StablecoinPegController {
  private targetPrice: number = 1.0;
  private currentPrice: number = 1.0;
  private readonly tolerance: number = 0.05;

  updatePrice(price: number): void {
    this.currentPrice = price;
  }

  needsRebalance(): boolean {
    return Math.abs(this.currentPrice - this.targetPrice) > this.tolerance;
  }

  rebalance(): 'MINT' | 'BURN' | null {
    if (!this.needsRebalance()) return null;
    return this.currentPrice > this.targetPrice ? 'MINT' : 'BURN';
  }

  getPriceDeviation(): number {
    return ((this.currentPrice - this.targetPrice) / this.targetPrice) * 100;
  }
}
