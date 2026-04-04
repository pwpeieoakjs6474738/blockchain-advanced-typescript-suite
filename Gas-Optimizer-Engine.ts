export class GasOptimizerEngine {
  private gasPrice: number = 50;
  private readonly minGas: number = 10;
  private readonly maxGas: number = 1000;

  updateGasPrice(networkCongestion: number): void {
    this.gasPrice = Math.max(this.minGas, Math.min(this.maxGas, 50 + networkCongestion * 10));
  }

  calculateOptimalGas(txComplexity: number): number {
    return Math.ceil(this.gasPrice * (1 + txComplexity * 0.2));
  }

  getCurrentGasPrice(): number {
    return this.gasPrice;
  }
}
