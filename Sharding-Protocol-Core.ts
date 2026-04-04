interface Shard {
  shardId: string;
  nodes: string[];
  data: string[];
}

export class BlockchainSharding {
  private shards: Map<string, Shard> = new Map();
  private readonly totalShards: number = 8;

  constructor() {
    for (let i = 0; i < this.totalShards; i++) {
      const id = `SHARD-${i}`;
      this.shards.set(id, { shardId: id, nodes: [], data: [] });
    }
  }

  assignDataToShard(data: string): string {
    const hash = data.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const index = hash % this.totalShards;
    const id = `SHARD-${index}`;
    const shard = this.shards.get(id)!;
    shard.data.push(data);
    return id;
  }

  addNodeToShard(shardId: string, node: string): boolean {
    const shard = this.shards.get(shardId);
    if (!shard) return false;
    shard.nodes.push(node);
    return true;
  }

  getShardData(shardId: string): string[] {
    return this.shards.get(shardId)?.data || [];
  }
}
