import { INode, Node } from '../nodes/Node'; // Import internal Node modules
import { ActionNode } from '../nodes/ActionNode'; // Import internal ActionNode module
import { ConditionNode } from '../nodes/ConditionNode'; // Import internal ConditionNode module
import { LoopNode } from '../nodes/LoopNode'; // Import internal LoopNode module

export class DecisionTreeService {
  constructor(private logger: any) {} // Constructor for DecisionTreeService class

  // Execute the decision tree based on the provided tree data
  execute(treeData: any): void {
    const rootNode = this.deserialize(treeData); // Deserialize the tree data to get the root node
    rootNode.execute(); // Execute the root node
  }

  // Deserialize the data to construct the appropriate node based on its type
  deserialize(data: any): Node {
    switch (data.type) {
      case 'Action':
        // Check if there is a nextAction and deserialize it
        const nextAction = data.nextAction ? this.deserialize(data.nextAction) as ActionNode : undefined; // Cast to ActionNode
        return new ActionNode(data.actionType, data.params, nextAction); // Create an ActionNode

      case 'Condition':
        return new ConditionNode(
          data.expression,
          this.deserialize(data.trueBranch), // Recursively deserialize the true branch
          this.deserialize(data.falseBranch) // Recursively deserialize the false branch
        );

      case 'Loop':
        // Handle multiple actions in the loop
        const actions = data.actions.map((action: any) => this.deserialize(action));
        return new LoopNode(data.iterations, actions); // Pass actions array to LoopNode

      default:
        throw new Error(`Unsupported node type: ${data.type}`); // Throw an error for unsupported node type
    }
  }
}
