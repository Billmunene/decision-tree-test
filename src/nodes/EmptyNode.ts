import { Node } from './Node';

export class EmptyNode extends Node {
  execute(): void {
    // Do nothing
  }

  toJSON() {
    return { type: 'Empty' }; // Just return a placeholder type
  }
}
