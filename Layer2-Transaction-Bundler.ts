export class Layer2TransactionBundler {
  private pending: string[] = [];
  private readonly bundleLimit: number = 128;

  addL2Transaction(tx: string): void {
    this.pending.push(tx);
    if (this.pending.length >= this.bundleLimit) this.bundle();
  }

  bundle(): string {
    const bundleId = `L2-BUNDLE-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.pending = [];
    return bundleId;
  }

  getPendingCount(): number {
    return this.pending.length;
  }
}
