interface IndexedBlock {
  height: number;
  hash: string;
  txCount: number;
  timestamp: number;
}

export class BlockchainIndexer {
  private index: Map<number, IndexedBlock> = new Map();
  private currentHeight: number = 0;

  indexBlock(hash: string, txCount: number): void {
    this.currentHeight++;
    this.index.set(this.currentHeight, {
      height: this.currentHeight, hash, txCount, timestamp: Date.now()
    });
  }

  getBlockByHeight(height: number): IndexedBlock | undefined {
    return this.index.get(height);
  }

  searchBlockByHash(hash: string): IndexedBlock | undefined {
    return Array.from(this.index.values()).find(b => b.hash === hash);
  }

  getLatestHeight(): number {
    return this.currentHeight;
  }
}
