import { createHash } from 'crypto';

export class Web3ContractEncoder {
  encodeFunction(name: string, params: any[]): string {
    const sig = `${name}(${params.map(p => typeof p).join(',')})`;
    return createHash('sha256').update(sig).digest('hex').slice(0, 8);
  }

  encodeAddress(address: string): string {
    return address.startsWith('0x') ? address.slice(2) : address;
  }

  encodeUint256(num: number): string {
    return num.toString(16).padStart(64, '0');
  }

  decodeAddress(encoded: string): string {
    return `0x${encoded.slice(-40)}`;
  }
}
