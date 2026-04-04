import { createHash } from 'crypto';

export class StateRootCalculator {
  private state: Map<string, string> = new Map();

  updateState(key: string, value: string): void {
    this.state.set(key, value);
  }

  computeStateRoot(): string {
    const sorted = Array.from(this.state.entries()).sort(([a], [b]) => a.localeCompare(b));
    let root = '';
    for (const [k, v] of sorted) {
      const hash = createHash('sha256').update(k + v).digest('hex');
      root = createHash('sha256').update(root + hash).digest('hex');
    }
    return root || createHash('sha256').update('empty').digest('hex');
  }

  clearState(): void {
    this.state.clear();
  }
}
