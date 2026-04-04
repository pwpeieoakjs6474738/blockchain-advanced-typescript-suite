export class ZkRollup {
  private transactions: string[] = [];
  private batchSize: number = 32;
  private batches: Map<string, string[]> = new Map();

  addTransaction(tx: string): void {
    this.transactions.push(tx);
    if (this.transactions.length >= this.batchSize) this.createBatch();
  }

  createBatch(): string {
    const batchId = `ZK-BATCH-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const batch = this.transactions.splice(0, this.batchSize);
    this.batches.set(batchId, batch);
    return batchId;
  }

  getBatch(batchId: string): string[] | undefined {
    return this.batches.get(batchId);
  }

  getPendingCount(): number {
    return this.transactions.length;
  }
}
