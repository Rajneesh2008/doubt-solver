//Import the OpenAI configuration
const openai = require("../config/openAI.config");

// Function to generate study material based on the type, topic, and complexity
exports.generateStudyMaterial = async (
  type = "summary",
  topic,
  complexity = "itermediate"
) => {
  let prompt; //storing prompt for different-2 types
  let res; //storing the response from chatgpt

  // according the type chat gpt will generate response
  switch (type) {
    case "summary": {
      prompt = `Summarize the key points of the topic '${topic}' for a ${complexity} level student.
       return response in the following parsable JSON formate:
        {
         topic:""topic",
         complexiy:"complexity",
         summary:"summary",
         suggestions:[suggest minimum 5 relevant topic ]
        }

        keep in mind all keys are same as mention in the formate otherwise my application will be broken
      `;
      res = await getResFromAi(prompt, topic, complexity);
      const data = JSON.parse(res);
      return data;
    }
    case "flashcards": {
      prompt = `Create minimum 5 flashcard object with id, questions and answer  for the topic '${topic}'.
       return response in the following parsable JSON formate:
       [{
       "id":1,
       "Q":"Question",
       "A":"Answer"
       },
       {
       "id":2,
       "Q":"Question",
       "A":"Answer"
       },
       {
       "id":3,
       "Q":"Question",
       "A":"Answer"
       },
       {
       "id":4,
       "Q":"Question",
       "A":"Answer"
       },
       {
       "id":5,
       "Q":"Question",
       "A":"Answer"
    }],
      `;
      res = await getResFromAi(prompt, topic, complexity);
      const data = JSON.parse(res);
      return data;
    }
    case "quiz": {
      prompt = `Create a quiz with minimum 5 questions on the topic of "${topic}" for a ${complexity} level student. Include multiple-choice options and provide the correct answer.
       return response in the following parsable JSON formate:
      [
    
        {
            "id":1,
            "question": "question"
            "options": [optionA, optionB, optionC, optionD],
            "correctAnswer": "correct option"
        },
        {   
            "id":2,
            "question": "question"
            "options": [optionA, optionB, optionC, optionD],
            "correctAnswer": "correct option"
        },
        { 
            "id":3,
            "question": "question"
            "options": [optionA, optionB, optionC, optionD],
            "correctAnswer": "correct option"
        },
        {   
            "id":4,
            "question": "question"
            "options": [optionA, optionB, optionC, optionD],
            "correctAnswer": "correct option"
        },
        {   
            "id:5,
            "question": "question"
            "options": [optionA, optionB, optionC, optionD],
            "correctAnswer": "correct option"
        }
      ]
      `;
      res = await getResFromAi(prompt, topic, complexity);
      const data = JSON.parse(res);

      return data;
    }
    default:
      throw new Error("Unknown study material type");
  }
};

// Function to generate feedback based on the type, attempted questions, and complexity
exports.generateFeedBack = async (data, complexity, totalQuiz, userScore) => {
  try {
    const percent = Math.floor((userScore * 100) / totalQuiz);
    const prompt = `
    A user just completed a quiz with the following stats:
    - Score: ${userScore}/${totalQuiz}
    - Complexity: ${complexity}
    - Accuracy: ${percent}%
    - Analyzed Data: The following data contains questions that the user answered incorrectly, along with the correct answers and the user's selected incorrect answers: ${JSON.stringify(
      data
    )}.
    
    Based on these stats, provide a personalized feedback message for the user in a friendly and encouraging tone like in accuracy is greater than 80 percent start with excellent, if greter than 40 then good if below 40 not bad . Highlight their strengths and suggest specific areas for improvement. Keep in mind the user's score percentage and the provided data, and focus on areas where they struggled. The feedback should guide the user on how to improve and encourage them to keep trying.
    
    Return the response in the following parsable JSON format:
    {
      "feedback": "genuine feedback"
    }
    `;

    res = await getResFromAi(prompt, "feedback", complexity);
    const parseData = JSON.parse(res);

    return parseData;
  } catch (error) {
    console.log(error, "generatefeed");
    return error;
  }
};

async function getResFromAi(prompt, topics, complexity) {
  try {
    let response = await openai.chat.completions.create({
      model: process.env.MODEL,
      messages: [
        { role: "system", content: prompt },
        {
          role: "user",
          content: `${topics} ${topics === "flashcards" ? "" : complexity}`,
        },
      ],
    });

    let res = response?.choices[0]?.message?.content;

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}
