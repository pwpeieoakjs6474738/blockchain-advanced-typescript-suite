import { createHash } from 'crypto';

export class CommitRevealScheme {
  private commits: Map<string, { hash: string; revealed: boolean }> = new Map();

  commit(secret: string): string {
    const salt = Math.random().toString(36).slice(2);
    const hash = createHash('sha256').update(secret + salt).digest('hex');
    const id = `COMMIT-${Date.now()}-${salt}`;
    this.commits.set(id, { hash, revealed: false });
    return id;
  }

  reveal(commitId: string, secret: string): boolean {
    const commit = this.commits.get(commitId);
    if (!commit || commit.revealed) return false;
    const salt = commitId.split('-').pop()!;
    const hash = createHash('sha256').update(secret + salt).digest('hex');
    const valid = hash === commit.hash;
    if (valid) commit.revealed = true;
    return valid;
  }
}
