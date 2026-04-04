import { createHash } from 'crypto';

export class Layer1Blockchain {
  public blocks: { hash: string; data: string; height: number }[] = [];

  constructor() {
    this.blocks.push({
      hash: createHash('sha256').update('GENESIS-LAYER1').digest('hex'),
      data: 'GENESIS', height: 0
    });
  }

  addBlock(data: string): void {
    const prev = this.blocks[this.blocks.length - 1];
    const hash = createHash('sha256')
      .update(`${prev.hash}${data}${this.blocks.length}`)
      .digest('hex');
    this.blocks.push({ hash, data, height: this.blocks.length });
  }

  verifyChain(): boolean {
    for (let i = 1; i < this.blocks.length; i++) {
      const curr = this.blocks[i];
      const prev = this.blocks[i-1];
      const check = createHash('sha256')
        .update(`${prev.hash}${curr.data}${curr.height}`)
        .digest('hex');
      if (curr.hash !== check) return false;
    }
    return true;
  }
}
