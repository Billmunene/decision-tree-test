import { Node } from './Node'; // Import internal Node module

// LoopNode class representing nodes that execute a subtree multiple times
export class LoopNode extends Node {
  constructor(private iterations: number, private subtree: Node) {
    super(); // Call the superclass constructor
  }

  // Execute method to run the subtree for a specified number of iterations
  execute(): void {
    for (let i = 0; i < this.iterations; i++) {
      this.subtree.execute(); // Execute the subtree
    }
  }

  // Convert the LoopNode to a JSON representation
  toJSON(): { type: string, iterations: number, subtree: any } {
    return { type: 'Loop', iterations: this.iterations, subtree: this.subtree.toJSON() }; // Return JSON representation of the LoopNode
  }
}