# readme

```markdown
# Decision Tree Processing Backend

This project implements a decision tree processing backend in TypeScript. It allows users to define and execute tailored business logic through a JSON representation of decision trees.

## Features

- **Serialization Support**: Supports converting decision trees to and from JSON.
- **Supported Actions**:
  - Send SMS
  - Send Email
  - Conditional logic
  - Loop execution
- **Extensibility**: Easily add new action types.
- **Backend Service**: Receives a JSON representation of a decision tree, deserializes it, and executes it.

## Project Structure

```
decision-tree-test/
├── src/
│ ├── index.ts # Main entry point of the application
│ ├── services/
│ │ └── DecisionTreeService.ts # Handles decision tree execution logic
│ ├── utils/
│ │ └── Logger.ts # Logging utility
│ ├── models/
│ │ ├── Node.ts # Base class for all nodes
│ │ ├── ActionNode.ts # Represents an action node
│ │ ├── ConditionNode.ts # Represents a condition node
│ │ └── LoopNode.ts # Represents a loop node
├── tests/ # Directory for test files
│ ├── decisionTreeService.test.ts # Tests for the DecisionTreeService
└── package.json # Project metadata and dependencies

```bash
bash
## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd decision-tree-test

```

1. Install the dependencies:
    
    ```bash
    bash
    npm install
    
    ```
    

## Running the Application

To start the application in development mode, run:

```bash
bash
npm run dev

```

This will start the server on `http://localhost:3000`.

## Testing the Application

### Running Tests

To run the tests using Jest, use the following command:

```bash
bash

npm test

```

### Testing with Postman

You can test the decision tree execution using Postman:

1. **Open Postman**.
2. Create a new **POST** request.
3. Enter the URL:
    
    ```bash
    bash
    http://localhost:3000/execute-tree
    
    ```
    

### Example 1: Christmas Condition

1. In the **Body** tab, select **raw** and choose **JSON** from the dropdown.
2. Paste the following JSON representation:

```json

{
  "type": "Condition",
  "expression": "new Date().toISOString().slice(0, 10) === '2025-01-01'",
  "trueBranch": {
    "type": "Action",
    "actionType": "SMS",
    "params": {
      "phoneNumber": "1234567890",
      "message": "Happy Christmas!"
    }
  },
  "falseBranch": {
    "type": "Action",
    "actionType": "NoOperation",
    "params": {}
  }
}

```

1. Click **Send**. If the current date is January 1, 2025, you should see a log for the SMS action in the console output.

### Example 2: Send Email, then SMS, then Another Email

1. In the **Body** tab, select **raw** and choose **JSON** from the dropdown.
2. Paste the following JSON representation:

```json

{
  "type": "Action",
  "actionType": "Email",
  "params": {
    "sender": "no-reply@test.com",
    "receiver": "user@test.com",
    "subject": "Welcome!",
    "body": "Thank you for signing up!"
  },
  "nextAction": {
    "type": "Action",
    "actionType": "SMS",
    "params": {
      "phoneNumber": "1234567890",
      "message": "Thank you for signing up! Welcome!"
    },
    "nextAction": {
      "type": "Action",
      "actionType": "Email",
      "params": {
        "sender": "no-reply@test.com",
        "receiver": "anotheruser@test.com",
        "subject": "Follow-up",
        "body": "We hope you enjoy our service!"
      }
    }
  }
}

```

1. Click **Send**. You should receive a response indicating whether the decision tree was executed successfully. Check the console output to see the logged parameters for each action executed.

### Example 3: Send 10 Optional Mails

1. In the **Body** tab, select **raw** and choose **JSON** from the dropdown.
2. Paste the following JSON representation:

```json
json
{
  "type": "Loop",
  "iterations": 10,
  "subtree": {
    "type": "Condition",
    "expression": "Math.random() < 0.5",  // 50% chance to send SMS
    "trueBranch": {
      "type": "Action",
      "actionType": "SMS",
      "params": {
        "phoneNumber": "1234567890",
        "message": "Sending optional SMS!"
      }
    },
    "falseBranch": {
      "type": "Action",
      "actionType": "NoOperation",
      "params": {}
    }
  }
}

```

1. Click **Send**. You should receive a response indicating whether the decision tree was executed successfully. Check the console output to see how many SMS messages were sent (if the random condition evaluated to true).

### Verifying Output

- **Console Logs**: In all scenarios, the parameters for each action should be logged to the console when executed. This includes the email send actions and SMS actions.
- **Response Messages**: Ensure that the responses from the `/execute-tree` endpoint indicate that actions were processed correctly.
- **Repeat Tests**: You can run these tests multiple times to see the randomness in the "Send 10 Optional Mails" scenario, ensuring the functionality works as expected.

## Contributing

If you'd like to contribute, feel free to submit a pull request or open an issue for discussion.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
