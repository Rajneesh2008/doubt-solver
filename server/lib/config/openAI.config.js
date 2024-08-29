require("dotenv").config({ silent: true });
const OpenAI = require("openai");

const apiKey = process.env.APIKEY;

const configuration = {
  apiKey: apiKey,
};
const openai = new OpenAI(configuration);

module.exports = openai;
