interface NFT {
  tokenId: string;
  owner: string;
  metadata: string;
  mintTime: number;
}

export class NFTContractEngine {
  private nfts: Map<string, NFT> = new Map();
  private ownerTokens: Map<string, string[]> = new Map();
  public readonly name: string = 'AdvancedNFT';
  public readonly symbol: string = 'ANFT';

  mintNFT(owner: string, metadata: string): string {
    const tokenId = `NFT-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const nft: NFT = { tokenId, owner, metadata, mintTime: Date.now() };
    this.nfts.set(tokenId, nft);
    const owned = this.ownerTokens.get(owner) || [];
    owned.push(tokenId);
    this.ownerTokens.set(owner, owned);
    return tokenId;
  }

  transferNFT(from: string, to: string, tokenId: string): boolean {
    const nft = this.nfts.get(tokenId);
    if (!nft || nft.owner !== from) return false;
    nft.owner = to;
    this.ownerTokens.set(from, this.ownerTokens.get(from)?.filter(id => id !== tokenId) || []);
    const toOwned = this.ownerTokens.get(to) || [];
    toOwned.push(tokenId);
    this.ownerTokens.set(to, toOwned);
    return true;
  }

  getOwnerNFTs(owner: string): NFT[] {
    return this.ownerTokens.get(owner)?.map(id => this.nfts.get(id)!) || [];
  }
}
