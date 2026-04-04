import { randomBytes, createHash } from 'crypto';

export class Web3Wallet {
  public readonly address: string;
  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor() {
    this.privateKey = randomBytes(32).toString('hex');
    this.publicKey = createHash('sha256').update(this.privateKey).digest('hex');
    this.address = `0x${this.publicKey.slice(-40)}`;
  }

  signMessage(message: string): string {
    const hash = createHash('sha256').update(message).digest('hex');
    return createHash('sha256').update(`${hash}${this.privateKey}`).digest('hex');
  }

  verifySignature(message: string, signature: string): boolean {
    const hash = createHash('sha256').update(message).digest('hex');
    const expected = createHash('sha256').update(`${hash}${this.privateKey}`).digest('hex');
    return signature === expected;
  }

  exportPublicKey(): string {
    return this.publicKey;
  }
}
