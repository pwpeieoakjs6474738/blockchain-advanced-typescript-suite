export class MultiSigWallet {
  private owners: Set<string> = new Set();
  private readonly requiredSignatures: number;
  private transactions: Map<string, { to: string; value: number; signers: Set<string>; executed: boolean }> = new Map();

  constructor(owners: string[], required: number) {
    owners.forEach(o => this.owners.add(o));
    this.requiredSignatures = Math.min(required, owners.length);
  }

  addTransaction(to: string, value: number): string {
    const id = `MULTISIG-TX-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.transactions.set(id, { to, value, signers: new Set(), executed: false });
    return id;
  }

  signTransaction(txId: string, signer: string): boolean {
    const tx = this.transactions.get(txId);
    if (!tx || !this.owners.has(signer) || tx.signers.has(signer) || tx.executed) return false;
    tx.signers.add(signer);
    return true;
  }

  executeTransaction(txId: string): boolean {
    const tx = this.transactions.get(txId);
    if (!tx || tx.executed || tx.signers.size < this.requiredSignatures) return false;
    tx.executed = true;
    return true;
  }
}
