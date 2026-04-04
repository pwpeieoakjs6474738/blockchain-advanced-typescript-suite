export class ArweaveDataUploader {
  private transactions: Map<string, { data: string; size: number; timestamp: number }> = new Map();
  private readonly costPerByte: number = 0.00001;

  calculateCost(data: string): number {
    const size = Buffer.byteLength(data, 'utf8');
    return size * this.costPerByte;
  }

  uploadData(data: string): string {
    const cost = this.calculateCost(data);
    const txId = `ARWEAVE-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.transactions.set(txId, {
      data, size: Buffer.byteLength(data, 'utf8'), timestamp: Date.now()
    });
    return txId;
  }

  retrieveData(txId: string): string | null {
    return this.transactions.get(txId)?.data || null;
  }
}
