import { Node } from './Node'; // Import internal Node module

// ActionNode class representing nodes that perform actions
export class ActionNode extends Node {
  constructor(
    private type: 'SMS' | 'Email',
    private params: any,
    private nextAction?: ActionNode // Optional parameter for chaining actions
  ) {
    super(); // Call the superclass constructor
  }

  // Execute method to perform the action based on the type
  execute(): void {
    if (this.type === 'SMS') {
      const { phoneNumber, message } = this.params; // Destructure parameters
      console.log(`SMS sent to ${phoneNumber}: "${message}"`); // Log SMS message with content
    } else if (this.type === 'Email') {
      const { sender, receiver, subject, body } = this.params; // Destructure parameters
      console.log(`Email sent from ${sender} to ${receiver}: Subject: "${subject}", Body: "${body}"`); // Log Email message with details
    }

    // Execute the next action, if it exists
    if (this.nextAction) {
      this.nextAction.execute();
    }
  }

  // Convert the ActionNode to a JSON representation
  toJSON() {
    return { type: this.type, params: this.params }; // Return JSON representation of the ActionNode
  }
}
