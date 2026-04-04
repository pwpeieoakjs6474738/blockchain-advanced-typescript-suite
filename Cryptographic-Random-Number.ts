import { randomBytes } from 'crypto';

export class CryptoRandomNumber {
  generateSecureNumber(min: number, max: number): number {
    const range = max - min + 1;
    const bytes = Math.ceil(Math.log2(range) / 8);
    const rand = parseInt(randomBytes(bytes).toString('hex'), 16);
    return min + (rand % range);
  }

  generateRandomHash(): string {
    return randomBytes(32).toString('hex');
  }

  generateSalt(): string {
    return randomBytes(16).toString('hex');
  }
}
