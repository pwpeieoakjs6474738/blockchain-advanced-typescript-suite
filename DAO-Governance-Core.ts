interface Proposal {
  id: string;
  title: string;
  votesFor: number;
  votesAgainst: number;
  active: boolean;
}

export class DAOGovernance {
  private proposals: Map<string, Proposal> = new Map();
  private votes: Map<string, Set<string>> = new Map();

  createProposal(title: string): string {
    const id = `PROP-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.proposals.set(id, { id, title, votesFor: 0, votesAgainst: 0, active: true });
    this.votes.set(id, new Set());
    return id;
  }

  vote(proposalId: string, voter: string, support: boolean): boolean {
    const prop = this.proposals.get(proposalId);
    const voted = this.votes.get(proposalId);
    if (!prop || !voted || !prop.active || voted.has(voter)) return false;
    voted.add(voter);
    support ? prop.votesFor++ : prop.votesAgainst++;
    return true;
  }

  closeProposal(proposalId: string): boolean {
    const prop = this.proposals.get(proposalId);
    if (!prop) return false;
    prop.active = false;
    return true;
  }

  getProposal(id: string): Proposal | undefined {
    return this.proposals.get(id);
  }
}
