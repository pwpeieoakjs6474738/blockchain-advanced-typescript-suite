interface DAGNode {
  id: string;
  parents: string[];
  data: string;
  timestamp: number;
}

export class DAGBlockchain {
  private nodes: Map<string, DAGNode> = new Map();

  addNode(data: string, parents: string[] = []): string {
    const id = `DAG-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.nodes.set(id, { id, parents, data, timestamp: Date.now() });
    return id;
  }

  getNode(id: string): DAGNode | undefined {
    return this.nodes.get(id);
  }

  getNodeChildren(id: string): DAGNode[] {
    return Array.from(this.nodes.values()).filter(n => n.parents.includes(id));
  }

  validateDAG(): boolean {
    const visited = new Set<string>();
    const dfs = (nodeId: string, path: Set<string>): boolean => {
      if (path.has(nodeId)) return false;
      if (visited.has(nodeId)) return true;
      visited.add(nodeId);
      path.add(nodeId);
      const node = this.nodes.get(nodeId)!;
      for (const p of node.parents) if (!dfs(p, new Set(path))) return false;
      path.delete(nodeId);
      return true;
    };
    return Array.from(this.nodes.keys()).every(id => dfs(id, new Set()));
  }
}
