import { Node } from './Node'; // Import internal Node module

// LoopNode class representing nodes that execute multiple actions multiple times
export class LoopNode extends Node {
  constructor(private iterations: number, private actions: Node[]) {
    super(); // Call the superclass constructor
  }

  // Execute method to run all actions for a specified number of iterations
  execute(): void {
    for (let i = 0; i < this.iterations; i++) {
      this.actions.forEach(action => action.execute()); // Execute each action in the actions array
    }
  }

  // Convert the LoopNode to a JSON representation
  toJSON(): { type: string, iterations: number, actions: any[] } {
    return {
      type: 'Loop',
      iterations: this.iterations,
      actions: this.actions.map(action => action.toJSON()) // Convert all actions to JSON
    };
  }
}
