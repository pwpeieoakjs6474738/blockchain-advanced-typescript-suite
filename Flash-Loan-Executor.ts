export class FlashLoanExecutor {
  private poolBalance: number = 1000000;
  private readonly fee: number = 0.001;

  executeLoan(amount: number, action: () => boolean): boolean {
    if (amount > this.poolBalance) return false;
    this.poolBalance -= amount;
    const success = action();
    const repayment = amount * (1 + this.fee);
    if (success && this.poolBalance + repayment >= this.poolBalance) {
      this.poolBalance += repayment;
      return true;
    }
    this.poolBalance += amount;
    return false;
  }

  getPoolBalance(): number {
    return this.poolBalance;
  }
}
