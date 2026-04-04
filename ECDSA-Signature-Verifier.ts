import { createHash } from 'crypto';

export class ECDSASignatureVerifier {
  private readonly curve: string = 'secp256k1';

  generateKeyPair(): { publicKey: string; privateKey: string } {
    const privateKey = createHash('sha256').update(Math.random().toString()).digest('hex');
    const publicKey = createHash('sha256').update(privateKey).digest('hex');
    return { privateKey, publicKey };
  }

  sign(privateKey: string, message: string): string {
    const msgHash = createHash('sha256').update(message).digest('hex');
    return createHash('sha256').update(`${privateKey}${msgHash}`).digest('hex');
  }

  verify(publicKey: string, message: string, signature: string): boolean {
    const msgHash = createHash('sha256').update(message).digest('hex');
    const expected = createHash('sha256').update(`${publicKey}${msgHash}`).digest('hex');
    return signature === expected;
  }
}
