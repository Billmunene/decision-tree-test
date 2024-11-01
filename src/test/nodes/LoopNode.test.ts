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
  let mockSubtree: MockNode; // Mock node instance
  let consoleSpy: jest.SpyInstance; // Spy on console.log

  // Setup before each test
  beforeEach(() => {
    mockSubtree = new MockNode(); // Create a new MockNode instance
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(); // Spy on console.log
  });

  // Cleanup after each test
  afterEach(() => {
    consoleSpy.mockRestore(); // Restore console.log spy
  });

  // Test case to check if subtree executes correct number of times
  it('should execute the subtree the correct number of times', () => {
    const node = new LoopNode(3, mockSubtree); // Create LoopNode instance with 3 iterations
    node.execute(); // Execute the LoopNode
    expect(consoleSpy).toHaveBeenCalledTimes(3); // Expect console.log to be called 3 times
  });

  // Test case to check JSON serialization
  it('should serialize to JSON correctly', () => {
    const node = new LoopNode(3, mockSubtree); // Create LoopNode instance with 3 iterations
    const json = node.toJSON(); // Serialize the LoopNode to JSON
    expect(json).toEqual({ // Expect JSON output to match the structure
      type: 'Loop',
      iterations: 3,
      subtree: {}
    });
  });
});