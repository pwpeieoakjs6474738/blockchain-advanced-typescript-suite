export class BlockchainSnapshotTaker {
  private snapshots: Map<string, { state: any; timestamp: number }> = new Map();

  takeSnapshot(state: any): string {
    const id = `SNAP-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.snapshots.set(id, { state: JSON.parse(JSON.stringify(state)), timestamp: Date.now() });
    return id;
  }

  restoreSnapshot(id: string): any | null {
    return this.snapshots.get(id)?.state || null;
  }

  listSnapshots(): string[] {
    return Array.from(this.snapshots.keys()).sort((a, b) => {
      return this.snapshots.get(b)!.timestamp - this.snapshots.get(a)!.timestamp;
    });
  }
}
