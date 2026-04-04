import { createHash } from 'crypto';

export class MerkleTree {
  private leaves: string[] = [];
  private tree: string[][] = [];

  constructor(data: string[]) {
    this.leaves = data.map(d => this.hash(d));
    this.buildTree();
  }

  private hash(data: string): string {
    return createHash('sha256').update(data).digest('hex');
  }

  private buildTree(): void {
    this.tree = [this.leaves];
    let level = this.leaves;
    while (level.length > 1) {
      const nextLevel: string[] = [];
      for (let i = 0; i < level.length; i += 2) {
        const left = level[i];
        const right = level[i + 1] || left;
        nextLevel.push(this.hash(left + right));
      }
      this.tree.push(nextLevel);
      level = nextLevel;
    }
  }

  getRoot(): string {
    return this.tree[this.tree.length - 1][0];
  }

  getProof(index: number): string[] {
    const proof: string[] = [];
    let i = index;
    for (let level = 0; level < this.tree.length - 1; level++) {
      const sibling = i % 2 === 0 ? i + 1 : i - 1;
      if (sibling < this.tree[level].length) {
        proof.push(this.tree[level][sibling]);
      }
      i = Math.floor(i / 2);
    }
    return proof;
  }
}
