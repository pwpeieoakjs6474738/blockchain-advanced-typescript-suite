export class DeFiPriceAggregator {
  private sources: Map<string, () => Promise<number>> = new Map();

  addSource(name: string, provider: () => Promise<number>): void {
    this.sources.set(name, provider);
  }

  async getAggregatedPrice(): Promise<number> {
    const prices = await Promise.all(Array.from(this.sources.values()).map(s => s()));
    const sorted = prices.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid-1] + sorted[mid]) / 2 : sorted[mid];
  }

  getSourceCount(): number {
    return this.sources.size;
  }
}
