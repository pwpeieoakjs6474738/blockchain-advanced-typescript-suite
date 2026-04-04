export class SmartContractStorage {
  private storage: Map<string, string> = new Map();
  private readonly maxSize: number = 1024 * 1024;
  private currentSize: number = 0;

  set(key: string, value: string): boolean {
    const size = Buffer.byteLength(key + value, 'utf8');
    if (this.currentSize + size > this.maxSize) return false;
    this.storage.set(key, value);
    this.currentSize += size;
    return true;
  }

  get(key: string): string | undefined {
    return this.storage.get(key);
  }

  delete(key: string): void {
    const val = this.storage.get(key);
    if (val) {
      this.currentSize -= Buffer.byteLength(key + val, 'utf8');
      this.storage.delete(key);
    }
  }

  getUsage(): number {
    return (this.currentSize / this.maxSize) * 100;
  }
}
