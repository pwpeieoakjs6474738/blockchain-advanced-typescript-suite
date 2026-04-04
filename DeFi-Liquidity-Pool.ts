export class DeFiLiquidityPool {
  private tokenA: number = 0;
  private tokenB: number = 0;
  private liquidity: number = 0;
  private readonly feeRate: number = 0.003;

  addLiquidity(a: number, b: number): number {
    if (this.tokenA === 0 && this.tokenB === 0) {
      this.tokenA = a;
      this.tokenB = b;
      this.liquidity = Math.sqrt(a * b);
      return this.liquidity;
    }
    const share = Math.min(a / this.tokenA, b / this.tokenB);
    const mint = share * this.liquidity;
    this.tokenA += a;
    this.tokenB += b;
    this.liquidity += mint;
    return mint;
  }

  swapTokenAtoB(amountA: number): number {
    const fee = amountA * this.feeRate;
    const input = amountA - fee;
    const newA = this.tokenA + input;
    const newB = (this.tokenA * this.tokenB) / newA;
    const out = this.tokenB - newB;
    this.tokenA = newA;
    this.tokenB = newB;
    return out;
  }

  getReserves(): { a: number; b: number } {
    return { a: this.tokenA, b: this.tokenB };
  }
}
