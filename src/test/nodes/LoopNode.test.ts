import { LoopNode } from '../../nodes/LoopNode'; // Import the LoopNode class
import { ActionNode } from '../../nodes/ActionNode'; // Import the ActionNode class

describe("LoopNode", () => {
  it("executes actions multiple times", () => {
    const mockSMSParams = {
      phoneNumber: "1234567890",
      message: "Loop Test SMS"
    };

    const smsNode = new ActionNode("SMS", mockSMSParams);

    console.log = jest.fn(); // Mock console.log

    // Create LoopNode with 3 iterations
    const loopNode = new LoopNode(3, [smsNode]);

    loopNode.execute();

    // Verify the SMS action is executed 3 times
    expect(console.log).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenCalledWith('SMS sent to 1234567890: "Loop Test SMS"');
  });

  it("executes multiple actions in each iteration", () => {
    const mockSMSParams = {
      phoneNumber: "1234567890",
      message: "Loop SMS"
    };

    const mockEmailParams = {
      sender: "sender@example.com",
      receiver: "receiver@example.com",
      subject: "Loop Email",
      body: "Loop email body"
    };

    const smsNode = new ActionNode("SMS", mockSMSParams);
    const emailNode = new ActionNode("Email", mockEmailParams);

    console.log = jest.fn(); // Mock console.log

    // Create LoopNode with 2 iterations and multiple actions
    const loopNode = new LoopNode(2, [smsNode, emailNode]);

    loopNode.execute();

    // Verify the SMS and Email actions are executed twice
    expect(console.log).toHaveBeenCalledTimes(4); // 2 iterations * 2 actions
    expect(console.log).toHaveBeenCalledWith('SMS sent to 1234567890: "Loop SMS"');
    expect(console.log).toHaveBeenCalledWith(
      'Email sent from sender@example.com to receiver@example.com: Subject: "Loop Email", Body: "Loop email body"'
    );
  });

  it("executes with zero iterations", () => {
    const mockSMSParams = {
      phoneNumber: "1234567890",
      message: "Zero Iteration Test"
    };

    const smsNode = new ActionNode("SMS", mockSMSParams);

    console.log = jest.fn(); // Mock console.log

    // Create LoopNode with 0 iterations
    const loopNode = new LoopNode(0, [smsNode]);

    loopNode.execute();

    // Verify that no action is executed
    expect(console.log).toHaveBeenCalledTimes(0);
  });
});
