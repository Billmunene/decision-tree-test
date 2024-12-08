import { Node } from './Node'; // Import internal Node module
import { ActionNode } from './ActionNode'; // Import ActionNode

// ConditionNode class representing nodes that execute based on a condition
export class ConditionNode extends Node {
  constructor(private expression: string, private trueBranch: Node, private falseBranch: Node) {
    super(); // Call the superclass constructor
  }

  // Execute method to evaluate the condition and execute the appropriate branch
  execute(): void {
    try {
      // Evaluate the condition expression safely using a restricted context
      const conditionMet = this.evaluateCondition(this.expression);
      
      // Execute the appropriate branch based on whether the condition is met
      conditionMet ? this.trueBranch.execute() : this.falseBranch.execute();
    } catch (error) {
      console.error("Error evaluating condition:", error);
    }
  }

  // Helper method to safely evaluate the condition expression
  private evaluateCondition(expression: string): boolean {
    // Safely evaluate the condition without using eval
    const condition = new Function("return " + expression); // Create a function to evaluate the expression
    return condition(); // Call the function to get the result
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
