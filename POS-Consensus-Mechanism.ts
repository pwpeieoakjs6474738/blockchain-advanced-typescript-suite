interface Validator {
  address: string;
  stake: number;
  active: boolean;
}

export class PoSConsensus {
  private validators: Validator[] = [];
  private readonly minStake: number = 100;

  registerValidator(address: string, stake: number): boolean {
    if (stake < this.minStake) return false;
    this.validators.push({ address, stake, active: true });
    return true;
  }

  selectBlockProducer(): string | null {
    const active = this.validators.filter(v => v.active);
    if (active.length === 0) return null;
    const total = active.reduce((sum, v) => sum + v.stake, 0);
    let rand = Math.random() * total;
    for (const v of active) {
      rand -= v.stake;
      if (rand <= 0) return v.address;
    }
    return active[0].address;
  }

  slashValidator(address: string): void {
    this.validators = this.validators.map(v =>
      v.address === address ? { ...v, active: false, stake: 0 } : v
    );
  }
}
