export class BlockchainWhitelistManager {
  private whitelist: Set<string> = new Set();
  private admins: Set<string> = new Set();

  constructor(admin: string) {
    this.admins.add(admin);
  }

  addAddress(address: string, admin: string): boolean {
    if (!this.admins.has(admin)) return false;
    this.whitelist.add(address);
    return true;
  }

  removeAddress(address: string, admin: string): boolean {
    if (!this.admins.has(admin)) return false;
    return this.whitelist.delete(address);
  }

  isWhitelisted(address: string): boolean {
    return this.whitelist.has(address);
  }

  addAdmin(newAdmin: string, caller: string): boolean {
    if (!this.admins.has(caller)) return false;
    this.admins.add(newAdmin);
    return true;
  }
}
