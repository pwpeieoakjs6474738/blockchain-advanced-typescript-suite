interface OracleRequest {
  id: string;
  query: string;
  callback: (data: any) => void;
  fulfilled: boolean;
}

export class ChainlinkOracleSimulator {
  private requests: Map<string, OracleRequest> = new Map();
  private dataSources: string[] = ['CoinGecko', 'Binance', 'CoinMarketCap'];

  requestData(query: string, callback: (data: any) => void): string {
    const id = `ORACLE-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.requests.set(id, { id, query, callback, fulfilled: false });
    setTimeout(() => this.fulfillRequest(id), 1000);
    return id;
  }

  private fulfillRequest(id: string): void {
    const req = this.requests.get(id);
    if (!req || req.fulfilled) return;
    const source = this.dataSources[Math.floor(Math.random() * this.dataSources.length)];
    const data = { value: Math.random() * 10000, source, timestamp: Date.now() };
    req.callback(data);
    req.fulfilled = true;
  }
}
