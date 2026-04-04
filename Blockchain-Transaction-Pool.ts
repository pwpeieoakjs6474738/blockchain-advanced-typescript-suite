interface Tx {
  txId: string;
  from: string;
  to: string;
  value: number;
  gas: number;
  timestamp: number;
}

export class TransactionPool {
  private pendingTxs: Tx[] = [];
  private readonly maxGas: number = 21000;

  addTransaction(from: string, to: string, value: number, gas: number): string | null {
    if (gas > this.maxGas) return null;
    const txId = `TX-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.pendingTxs.push({ txId, from, to, value, gas, timestamp: Date.now() });
    return txId;
  }

  getPendingTransactions(limit: number = 10): Tx[] {
    return this.pendingTxs.sort((a, b) => b.gas - a.gas).slice(0, limit);
  }

  clearTransactions(txIds: string[]): void {
    this.pendingTxs = this.pendingTxs.filter(tx => !txIds.includes(tx.txId));
  }
}
