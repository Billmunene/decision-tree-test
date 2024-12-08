import { ConditionNode } from '../../nodes/ConditionNode'; // Import the ConditionNode class
import { ActionNode } from '../../nodes/ActionNode'; // Import the ActionNode class

describe("ConditionNode", () => {
  it("executes the true branch when the condition is met", () => {
    const mockSMSParams = {
      phoneNumber: "1234567890",
      message: "Condition Met!"
    };

    const smsNode = new ActionNode("SMS", mockSMSParams);
    const mockNoOpAction = new ActionNode("SMS", { phoneNumber: "0000000000", message: "" });

    console.log = jest.fn(); // Mock console.log

    // Create ConditionNode with condition always true
    const conditionNode = new ConditionNode(
      "'2025-01-01' === '2025-01-01'", // Always true condition
      smsNode,
      mockNoOpAction
    );

    conditionNode.execute();

    // Verify the SMS action is executed (true branch)
    expect(console.log).toHaveBeenCalledWith('SMS sent to 1234567890: "Condition Met!"');
  });

  it("executes the false branch when the condition is not met", () => {
    const mockSMSParams = {
      phoneNumber: "1234567890",
      message: "Condition Met!"
    };

    const mockEmailParams = {
      sender: "sender@example.com",
      receiver: "receiver@example.com",
      subject: "Condition Not Met",
      body: "Condition is false"
    };

    const smsNode = new ActionNode("SMS", mockSMSParams);
    const emailNode = new ActionNode("Email", mockEmailParams);

    console.log = jest.fn(); // Mock console.log

    // Create ConditionNode with condition always false
    const conditionNode = new ConditionNode(
      "'2025-01-01' !== '2025-01-01'", // Always false condition
      smsNode,
      emailNode
    );

    conditionNode.execute();

    // Verify the Email action is executed (false branch)
    expect(console.log).toHaveBeenCalledWith(
      'Email sent from sender@example.com to receiver@example.com: Subject: "Condition Not Met", Body: "Condition is false"'
    );
  });
});
