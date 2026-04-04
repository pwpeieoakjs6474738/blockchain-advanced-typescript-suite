import { createHash } from 'crypto';

export class IPFSCIDGenerator {
  private readonly version: number = 1;
  private readonly codec: string = 'dag-pb';

  generateCID(data: string): string {
    const hash = createHash('sha256').update(data).digest('hex');
    return `Qm${this.version}${this.codec.slice(0, 2)}${hash.slice(0, 44)}`;
  }

  validateCID(cid: string): boolean {
    return cid.startsWith('Qm') && cid.length === 46;
  }

  hashContent(data: string): string {
    return createHash('sha256').update(data).digest('hex');
  }
}
