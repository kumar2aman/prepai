import { chatHistory } from "../api/v1/geminiAudio.js";

export const prompt = `
Analyze the following chat between the user and AI interviewer. Based on the user's performance, return a JSON object with the following fields only:

- progress (String)
- score (Int)
- level (Int)
- accuracy (Int)
- streak (Int)

Use the chat to estimate how well the user is doing in the interview. Do not add any explanation or extra output — only return the JSON object.

Chat:

"""
${chatHistory.map((message) => `${message.role}: ${message.text}`).join("\n")}
"""
`;
