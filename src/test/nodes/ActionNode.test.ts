import { ActionNode } from '../../nodes/ActionNode'; // Import the ActionNode class

describe("ActionNode", () => {
  it("executes SMS action correctly", () => {
    const mockSMSParams = {
      phoneNumber: "1234567890",
      message: "Happy Birthday!"
    };

    const smsNode = new ActionNode("SMS", mockSMSParams);

    console.log = jest.fn(); // Mock console.log

    smsNode.execute();

    // Verify the correct SMS message is logged
    expect(console.log).toHaveBeenCalledWith('SMS sent to 1234567890: "Happy Birthday!"');
  });

  it("executes Email action correctly", () => {
    const mockEmailParams = {
      sender: "sender@example.com",
      receiver: "receiver@example.com",
      subject: "Test Email",
      body: "This is a test email body."
    };

    const emailNode = new ActionNode("Email", mockEmailParams);

    console.log = jest.fn(); // Mock console.log

    emailNode.execute();

    // Verify the correct Email message is logged
    expect(console.log).toHaveBeenCalledWith(
      'Email sent from sender@example.com to receiver@example.com: Subject: "Test Email", Body: "This is a test email body."'
    );
  });

  it("executes chained actions correctly", () => {
    const mockSMSParams = {
      phoneNumber: "1234567890",
      message: "Happy Birthday!"
    };

    const mockEmailParams = {
      sender: "sender@example.com",
      receiver: "receiver@example.com",
      subject: "Test Email",
      body: "This is a test email body."
    };

    const emailNode = new ActionNode("Email", mockEmailParams);
    const smsNode = new ActionNode("SMS", mockSMSParams, emailNode); // Chain SMS -> Email

    console.log = jest.fn(); // Mock console.log

    smsNode.execute();

    // Verify SMS action is logged first
    expect(console.log).toHaveBeenCalledWith('SMS sent to 1234567890: "Happy Birthday!"');

    // Verify Email action is logged after SMS
    expect(console.log).toHaveBeenCalledWith(
      'Email sent from sender@example.com to receiver@example.com: Subject: "Test Email", Body: "This is a test email body."'
    );
  });
});
