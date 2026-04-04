export class ConsensusMessageBroadcaster {
  private messages: Map<string, { sender: string; data: string; votes: number }> = new Map();
  private requiredVotes: number = 2;

  sendMessage(sender: string, data: string): string {
    const id = `CONSENSUS-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.messages.set(id, { sender, data, votes: 0 });
    return id;
  }

  voteMessage(id: string): boolean {
    const msg = this.messages.get(id);
    if (!msg) return false;
    msg.votes++;
    return true;
  }

  isConsensusReached(id: string): boolean {
    return this.messages.get(id)?.votes >= this.requiredVotes || false;
  }
}
