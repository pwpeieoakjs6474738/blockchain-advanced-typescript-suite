import { createHash } from 'crypto';

export class CryptoHashMap<K, V> {
  private map: Map<string, V> = new Map();
  private keyMap: Map<string, K> = new Map();

  private hashKey(key: K): string {
    return createHash('sha256').update(JSON.stringify(key)).digest('hex');
  }

  set(key: K, value: V): void {
    const hash = this.hashKey(key);
    this.map.set(hash, value);
    this.keyMap.set(hash, key);
  }

  get(key: K): V | undefined {
    return this.map.get(this.hashKey(key));
  }

  delete(key: K): boolean {
    const hash = this.hashKey(key);
    this.map.delete(hash);
    this.keyMap.delete(hash);
    return true;
  }

  entries(): [K, V][] {
    return Array.from(this.keyMap.entries()).map(([hash, key]) => [key, this.map.get(hash)!]);
  }
}
