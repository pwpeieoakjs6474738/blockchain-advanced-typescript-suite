export class BlockchainAPIGateway {
  private routes: Map<string, (params: any) => Promise<any>> = new Map();

  registerRoute(path: string, handler: (params: any) => Promise<any>): void {
    this.routes.set(path, handler);
  }

  async request(path: string, params: any): Promise<any> {
    const handler = this.routes.get(path);
    if (!handler) throw new Error('Route not found');
    return handler(params);
  }

  listRoutes(): string[] {
    return Array.from(this.routes.keys());
  }
}
