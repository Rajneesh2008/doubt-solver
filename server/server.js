// Load environment variables from the .env file
require("dotenv").config();

// Import necessary modules
const cors = require("cors");
const express = require("express");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const compression = require("compression");

// Import custom helper function for generating study material
const {
  generateStudyMaterial,
  generateFeedBack,
} = require("./lib/helper/common");

// Initialize Express app
const app = express();

// Apply compression middleware
app.use(compression());

// Enable HTTP request logging using Morgan middleware
app.use(morgan("dev"));

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Set up rate limiting to limit each IP to 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per window
  standardHeaders: "draft-7", // Use draft-7 standard headers for rate limiting
  legacyHeaders: false, // Disable legacy X-RateLimit headers
});

// Apply rate limiting middleware to all requests
app.use(limiter);

// Enable parsing of JSON request bodies
app.use(express.json());

// Define the port number from environment variables or default to 4000
const PORT = process.env["PORT"] || 4000;

// Define a basic route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome!");
});

// Define the /doubt endpoint to generate study material
app.post("/doubt", async (req, res) => {
  const { topic, complexity, type } = req.body;

  try {
    // Call the generateStudyMaterial function with the provided data
    let result = await generateStudyMaterial(type, topic, complexity);

    // Create a response object with a success message and the generated material
    let resObj = {
      msg: "success",
    };
    resObj[`${type}`] = result;

    // Send the response with a 200 status code
    res.status(200).send(resObj);
  } catch (error) {
    // Handle any errors by sending a 500 status code and the error message
    res.status(500).send({ msg: "error", error });
  }
});

// route for feedback

app.post("/feedback", async (req, res) => {
  const { data, complexity, totalQuiz, userScore } = req.body;

  try {
    let response = await generateFeedBack(
      data,
      complexity,
      totalQuiz,
      userScore
    );

    res.status(200).send({ msg: "success", feedback: response });
  } catch (error) {
    res.status(500).send({ msg: "error", error });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
