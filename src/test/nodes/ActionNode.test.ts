import { ActionNode } from '../../nodes/ActionNode';


// Test suite for ActionNode functionality
describe('ActionNode', () => {
  let consoleSpy: jest.SpyInstance; // Spy to monitor console.log calls

  // Setup before each test
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(); // Spy on console.log to intercept calls
  });

  // Cleanup after each test
  afterEach(() => {
    consoleSpy.mockRestore(); // Restore the original console.log functionality
  });

  // Test case to log SMS message when type is SMS
  it('should log SMS message when type is SMS', () => {
    const node = new ActionNode('SMS', { phoneNumber: '1234567890' }); // Create ActionNode instance for SMS
    node.execute(); // Execute the ActionNode
    expect(consoleSpy).toHaveBeenCalledWith('Sending SMS to 1234567890'); // Verify the correct SMS message is logged
  });

  // Test case to log Email message when type is Email
  it('should log Email message when type is Email', () => {
    const node = new ActionNode('Email', { sender: 'sender@test.com', receiver: 'receiver@test.com' }); // Create ActionNode instance for Email
    node.execute(); // Execute the ActionNode
    expect(consoleSpy).toHaveBeenCalledWith('Sending Email from sender@test.com to receiver@test.com'); // Verify the correct Email message is logged
  });

  // Test case to ensure JSON serialization is correct
  it('should serialize to JSON correctly', () => {
    const node = new ActionNode('Email', { sender: 'sender@test.com', receiver: 'receiver@test.com' }); // Create ActionNode instance for Email
    const expectedJson = { // Define the expected JSON output
      type: 'Email',
      params: { sender: 'sender@test.com', receiver: 'receiver@test.com' }
    };
    expect(node.toJSON()).toEqual(expectedJson); // Verify the JSON serialization matches the expected output
  });
});