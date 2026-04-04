import { createHash } from 'crypto';

export class LightClientVerifier {
  private blockHeaders: string[] = [];
  private readonly syncInterval: number = 1000;

  syncHeader(header: string): void {
    this.blockHeaders.push(header);
    if (this.blockHeaders.length > 10) this.blockHeaders.shift();
  }

  verifyTransactionProof(txHash: string, merkleRoot: string, proof: string[]): boolean {
    let computed = txHash;
    for (const p of proof) {
      computed = createHash('sha256').update(computed + p).digest('hex');
    }
    return computed === merkleRoot;
  }

  getLatestHeader(): string | undefined {
    return this.blockHeaders[this.blockHeaders.length - 1];
  }
}
