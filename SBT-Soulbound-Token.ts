interface SBT {
  tokenId: string;
  owner: string;
  data: string;
  issueTime: number;
}

export class SoulboundToken {
  private tokens: Map<string, SBT> = new Map();
  private ownerMap: Map<string, string[]> = new Map();

  mintSBT(owner: string, data: string): string {
    const tokenId = `SBT-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.tokens.set(tokenId, { tokenId, owner, data, issueTime: Date.now() });
    const owned = this.ownerMap.get(owner) || [];
    owned.push(tokenId);
    this.ownerMap.set(owner, owned);
    return tokenId;
  }

  getOwnerSBTs(owner: string): SBT[] {
    return this.ownerMap.get(owner)?.map(id => this.tokens.get(id)!) || [];
  }

  burnSBT(tokenId: string, owner: string): boolean {
    const sbt = this.tokens.get(tokenId);
    if (!sbt || sbt.owner !== owner) return false;
    this.tokens.delete(tokenId);
    this.ownerMap.set(owner, this.ownerMap.get(owner)?.filter(id => id !== tokenId) || []);
    return true;
  }
}
