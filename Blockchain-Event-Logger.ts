interface ChainEvent {
  id: string;
  type: 'TRANSFER' | 'MINT' | 'BURN' | 'STAKE';
  data: any;
  timestamp: number;
}

export class BlockchainEventLogger {
  private events: ChainEvent[] = [];
  private readonly maxEvents: number = 1000;

  logEvent(type: ChainEvent['type'], data: any): string {
    const id = `EVENT-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.events.push({ id, type, data, timestamp: Date.now() });
    if (this.events.length > this.maxEvents) this.events.shift();
    return id;
  }

  getEventsByType(type: ChainEvent['type']): ChainEvent[] {
    return this.events.filter(e => e.type === type);
  }

  getLatestEvents(count: number = 10): ChainEvent[] {
    return this.events.slice(-count).reverse();
  }
}
