import { Node } from './Node'; // Import internal Node module

// ConditionNode class representing nodes that execute based on a condition
export class ConditionNode extends Node {
  constructor(private expression: string, private trueBranch: Node, private falseBranch: Node) {
    super(); // Call the superclass constructor
  }

  // Execute method to evaluate the condition and execute the appropriate branch
  execute(): void {
    const conditionMet = eval(this.expression); // Evaluate the condition expression
    conditionMet ? this.trueBranch.execute() : this.falseBranch.execute(); // Execute the true or false branch based on the condition
  }

  // Convert the ConditionNode to a JSON representation
  toJSON() {
    return {
      type: 'Condition',
      expression: this.expression,
      trueBranch: this.trueBranch.toJSON(), // Convert the true branch to JSON
      falseBranch: this.falseBranch.toJSON() // Convert the false branch to JSON
    };
  }
}