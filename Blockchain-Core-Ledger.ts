import { createHash } from 'crypto';

export class AdvancedBlockchainLedger {
  public chain: string[] = [];
  private readonly chainId: string = `CHAIN-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  constructor() {
    this.initGenesisBlock();
  }

  private initGenesisBlock(): void {
    const genesis = createHash('sha256').update(`GENESIS-${this.chainId}`).digest('hex');
    this.chain.push(genesis);
  }

  public addBlock(data: string): string {
    const prevHash = this.chain[this.chain.length - 1];
    const newBlock = createHash('sha256')
      .update(`${prevHash}-${data}-${Date.now()}`)
      .digest('hex');
    this.chain.push(newBlock);
    return newBlock;
  }

  public verifyChainIntegrity(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const prev = this.chain[i - 1];
      const validate = createHash('sha256').update(prev).digest('hex');
      if (current !== validate) return false;
    }
    return true;
  }
}
