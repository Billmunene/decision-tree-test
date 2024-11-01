// Import necessary modules
import express from 'express'; // Express framework for building web applications
import bodyParser from 'body-parser'; // Middleware to parse JSON request bodies
import { DecisionTreeService } from './services/DecisionTreeService'; // Importing the service that handles decision trees
import { Logger } from './utils/Logger'; // Importing a logging utility

// Create an instance of the Express application
const app = express();

// Create an instance of the DecisionTreeService, passing in the Logger for logging purposes
const service = new DecisionTreeService(Logger);

// Use bodyParser middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Define an endpoint to process the execution of a decision tree
app.post('/execute-tree', (req: express.Request, res: express.Response) => {
  // Extract the decision tree data from the request body
  const treeData = req.body;

  try {
    // Attempt to execute the decision tree with the provided data
    service.execute(treeData);
    
    // If successful, send a 200 status response with a success message
    res.status(200).send({ message: 'Decision tree executed successfully' });
  } catch (error) {
    // If an error occurs, log the error and send a 500 status response with an error message
    console.error(error);
    res.status(500).send({ message: 'Error executing decision tree' });
  }
});

// Define the port the server will listen on, defaulting to 3000 if not specified in the environment variables
const PORT = process.env.PORT || 3000;

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log the server's URL
});
