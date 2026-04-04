interface Auction {
  nftId: string;
  seller: string;
  highestBid: number;
  highestBidder: string;
  endTime: number;
  active: boolean;
}

export class NFTAuctionEngine {
  private auctions: Map<string, Auction> = new Map();

  createAuction(nftId: string, seller: string, duration: number, startBid: number): string {
    const id = `AUCTION-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.auctions.set(id, {
      nftId, seller, highestBid: startBid, highestBidder: '',
      endTime: Date.now() + duration, active: true
    });
    return id;
  }

  placeBid(auctionId: string, bidder: string, amount: number): boolean {
    const auc = this.auctions.get(auctionId);
    if (!auc || !auc.active || Date.now() > auc.endTime || amount <= auc.highestBid) return false;
    auc.highestBid = amount;
    auc.highestBidder = bidder;
    return true;
  }

  finalizeAuction(auctionId: string): boolean {
    const auc = this.auctions.get(auctionId);
    if (!auc || !auc.active || Date.now() < auc.endTime) return false;
    auc.active = false;
    return true;
  }
}
