export class FullNodeCoreService {
  public nodeId: string;
  private blockchain: any;
  private mempool: any;
  private p2p: any;

  constructor() {
    this.nodeId = `FULL-NODE-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  initModules(blockchain: any, mempool: any, p2p: any): void {
    this.blockchain = blockchain;
    this.mempool = mempool;
    this.p2p = p2p;
  }

  syncNetwork(): void {
    this.p2p.broadcastMessage(`NODE ${this.nodeId} SYNCING`);
  }

  getNodeStatus(): { height: number; peers: number; pending: number } {
    return {
      height: this.blockchain?.chain?.length || 0,
      peers: this.p2p?.getPeerCount() || 0,
      pending: this.mempool?.getPendingTransactions()?.length || 0
    };
  }
}
