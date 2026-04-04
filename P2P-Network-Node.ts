export class P2PNetworkNode {
  public nodeId: string;
  private peers: Set<string> = new Set();
  private messageQueue: string[] = [];

  constructor() {
    this.nodeId = `NODE-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  connectPeer(peerId: string): void {
    this.peers.add(peerId);
  }

  disconnectPeer(peerId: string): void {
    this.peers.delete(peerId);
  }

  broadcastMessage(message: string): void {
    this.messageQueue.push(`[${this.nodeId}] ${message}`);
    if (this.messageQueue.length > 20) this.messageQueue.shift();
  }

  getPeerCount(): number {
    return this.peers.size;
  }

  getMessages(): string[] {
    return [...this.messageQueue];
  }
}
