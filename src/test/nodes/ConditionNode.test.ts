import { LoopNode } from '../../nodes/LoopNode';
import { Node } from '../../nodes/Node';

// MockNode class to simulate a node for testing purposes
class MockNode extends Node {
  // Simulates execution by logging a message
  execute(): void {
    console.log('Executed');
  }

  // Returns an empty object for serialization
  toJSON(): any {
    return {};
  }
}

// Test suite for LoopNode functionality
describe('LoopNode', () => {
  let mockSubtree: MockNode; // Instance of MockNode used as a subtree
  let consoleSpy: jest.SpyInstance; // Spy to monitor console.log calls

  // Setup before each test
  beforeEach(() => {
    mockSubtree = new MockNode(); // Initialize a new MockNode instance
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(); // Spy on console.log to intercept calls
  });

  // Cleanup after each test
  afterEach(() => {
    consoleSpy.mockRestore(); // Restore the original console.log functionality
  });

  // Test case to verify that the subtree executes the correct number of times
  it('should execute the subtree the correct number of times', () => {
    const node = new LoopNode(3, mockSubtree); // Create a LoopNode with 3 iterations
    node.execute(); // Execute the LoopNode
    expect(consoleSpy).toHaveBeenCalledTimes(3); // Verify console.log was called 3 times
  });

  // Test case to ensure JSON serialization is correct
  it('should serialize to JSON correctly', () => {
    const node = new LoopNode(3, mockSubtree); // Create a LoopNode with 3 iterations
    const json = node.toJSON(); // Serialize the LoopNode to JSON
    expect(json).toEqual({ // Verify the JSON structure matches expected output
      type: 'Loop',
      iterations: 3,
      subtree: {}
    });
  });
});