// Import the DecisionTreeService to handle decision tree execution
import { DecisionTreeService } from '../services/DecisionTreeService';
// Import the Logger utility for logging
import { Logger } from '../utils/Logger';

// Define a test case for executing a simple decision tree
test('should execute a simple decision tree', () => {
  // Create an instance of the DecisionTreeService, passing in the Logger for logging purposes
  const service = new DecisionTreeService(Logger);

  // Define a simple decision tree structure for testing
  const treeData = {
    // Type of node in the tree, which is a condition in this case
    type: 'Condition',
    // The expression that will be evaluated; checks if the current date is December 25th
    expression: 'new Date().getDate() === 25 && new Date().getMonth() === 11',
    // The branch that executes if the condition is true
    trueBranch: {
      type: 'Action', // This node represents an action to be taken
      actionType: 'SMS', // Type of action: sending an SMS
      params: { 
        phoneNumber: '1234567890' // Parameters for the action, e.g., phone number to send the SMS
      }
    },
    // The branch that executes if the condition is false
    falseBranch: {
      type: 'Action', // This node also represents an action
      actionType: 'Email', // Type of action: sending an Email
      params: {
        sender: 'no-reply@test.com', // Sender's email address
        receiver: 'user@test.com' // Receiver's email address
      }
    }
  };

  // Execute the decision tree with the defined tree data
  service.execute(treeData);
});
