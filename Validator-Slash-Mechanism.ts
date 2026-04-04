interface ChainValidator {
  id: string;
  stake: number;
  reputation: number;
  jailed: boolean;
}

export class ValidatorSlashMechanism {
  private validators: Map<string, ChainValidator> = new Map();
  private readonly slashRate: number = 0.5;
  private readonly minReputation: number = 30;

  registerValidator(id: string, stake: number): boolean {
    if (stake <= 0 || this.validators.has(id)) return false;
    this.validators.set(id, { id, stake, reputation: 100, jailed: false });
    return true;
  }

  slashValidator(id: string): boolean {
    const v = this.validators.get(id);
    if (!v || v.jailed) return false;
    v.stake *= (1 - this.slashRate);
    v.reputation -= 50;
    if (v.reputation < this.minReputation) v.jailed = true;
    return true;
  }

  unjail(id: string): boolean {
    const v = this.validators.get(id);
    if (!v || !v.jailed) return false;
    v.jailed = false;
    v.reputation = 50;
    return true;
  }
}
