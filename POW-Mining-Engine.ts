import { createHash } from 'crypto';

export class PoWMiningEngine {
  private readonly difficulty: number = 4;
  private readonly target: string = '0'.repeat(this.difficulty);

  mineBlock(data: string): { nonce: number; hash: string } {
    let nonce = 0;
    let hash = '';
    while (true) {
      hash = createHash('sha256')
        .update(`${data}${nonce}${Date.now()}`)
        .digest('hex');
      if (hash.startsWith(this.target)) break;
      nonce++;
    }
    return { nonce, hash };
  }

  verifyBlockHash(data: string, nonce: number, hash: string): boolean {
    const computed = createHash('sha256')
      .update(`${data}${nonce}`)
      .digest('hex');
    return computed === hash && hash.startsWith(this.target);
  }
}
