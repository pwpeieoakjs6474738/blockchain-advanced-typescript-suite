export class CrossChainDataFeed {
  private feeds: Map<string, { value: number; timestamp: number; chain: string }> = new Map();
  private readonly ttl: number = 300000;

  updateFeed(feedId: string, value: number, chain: string): void {
    this.feeds.set(feedId, { value, timestamp: Date.now(), chain });
  }

  getFeed(feedId: string): { value: number; chain: string; valid: boolean } | null {
    const feed = this.feeds.get(feedId);
    if (!feed) return null;
    const valid = Date.now() - feed.timestamp < this.ttl;
    return { value: feed.value, chain: feed.chain, valid };
  }

  pruneExpired(): void {
    const now = Date.now();
    Array.from(this.feeds.entries()).forEach(([id, f]) => {
      if (now - f.timestamp > this.ttl) this.feeds.delete(id);
    });
  }
}
