export class NFTMetadataGenerator {
  private baseUri: string = 'ipfs://';

  generateMetadata(name: string, description: string, attributes: Record<string, string>): string {
    const id = `META-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    return JSON.stringify({
      name, description, image: `${this.baseUri}${id}`,
      attributes, tokenId: id, timestamp: Date.now()
    });
  }

  setBaseUri(uri: string): void {
    this.baseUri = uri;
  }

  validateMetadata(meta: string): boolean {
    try {
      const parsed = JSON.parse(meta);
      return !!parsed.name && !!parsed.image;
    } catch {
      return false;
    }
  }
}
