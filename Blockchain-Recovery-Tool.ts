import { createHash } from 'crypto';

export class BlockchainRecoveryTool {
  private recoveryMap: Map<string, string> = new Map();

  generateRecoveryPhrase(): string[] {
    const words = [];
    for (let i = 0; i < 12; i++) {
      words.push(Math.random().toString(36).slice(2, 8));
    }
    return words;
  }

  storeRecovery(address: string, phrase: string[]): void {
    const hash = createHash('sha256').update(phrase.join('-')).digest('hex');
    this.recoveryMap.set(address, hash);
  }

  verifyRecovery(address: string, phrase: string[]): boolean {
    const expected = this.recoveryMap.get(address);
    if (!expected) return false;
    const hash = createHash('sha256').update(phrase.join('-')).digest('hex');
    return hash === expected;
  }
}
