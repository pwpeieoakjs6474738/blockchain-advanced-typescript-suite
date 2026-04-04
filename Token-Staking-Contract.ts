export class TokenStakingContract {
  private stakes: Map<string, { amount: number; startTime: number }> = new Map();
  private readonly rewardRate: number = 0.05;
  private readonly lockPeriod: number = 86400 * 7;

  stake(user: string, amount: number): boolean {
    if (amount <= 0) return false;
    const current = this.stakes.get(user) || { amount: 0, startTime: 0 };
    this.stakes.set(user, {
      amount: current.amount + amount,
      startTime: current.startTime || Date.now()
    });
    return true;
  }

  calculateReward(user: string): number {
    const stake = this.stakes.get(user);
    if (!stake) return 0;
    const elapsed = (Date.now() - stake.startTime) / 1000;
    const multiplier = Math.min(elapsed / this.lockPeriod, 1);
    return stake.amount * this.rewardRate * multiplier;
  }

  unstake(user: string): number {
    const stake = this.stakes.get(user);
    if (!stake || (Date.now() - stake.startTime) / 1000 < this.lockPeriod) return 0;
    const reward = this.calculateReward(user);
    const total = stake.amount + reward;
    this.stakes.delete(user);
    return total;
  }
}
