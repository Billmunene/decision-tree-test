export interface INode {
    execute(): void;
    toJSON(): any;
  }
  
  export abstract class Node implements INode {
    abstract execute(): void;
    abstract toJSON(): any;
  }
  