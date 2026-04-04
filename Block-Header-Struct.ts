import { createHash } from 'crypto';

export interface BlockHeaderData {
  height: number;
  prevHash: string;
  stateRoot: string;
  txRoot: string;
  timestamp: number;
}

export class BlockHeader {
  public readonly hash: string;
  constructor(public data: BlockHeaderData) {
    this.hash = this.computeHash();
  }

  private computeHash(): string {
    const { height, prevHash, stateRoot, txRoot, timestamp } = this.data;
    return createHash('sha256')
      .update(`${height}${prevHash}${stateRoot}${txRoot}${timestamp}`)
      .digest('hex');
  }

  isValid(prevHeaderHash: string): boolean {
    return this.data.prevHash === prevHeaderHash && this.hash === this.computeHash();
  }
}
