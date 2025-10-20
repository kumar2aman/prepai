import { chatHistory } from "../api/v1/GeminiAudio.js";

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
Stored AI response as text: Hi, I'm Purple Eye. I'll ask you five interview questions. First, tell me about yourself.
Transcribing...
User said: "Okay, so my name is Aman and I am a web developer."
🧠 Stored AI response as text: Hi, I'm Prepayai. I'll ask you five interview questions. First, tell me about yourself. What experience do you have with web development?
Transcribing...
User said: "Okay, so I know react next js basically I am a front end developer."
🧠 Stored AI response as text: Hi, I'm Prepayai. I'll ask you five interview questions. First, tell me about yourself. What experience do you have with web development? What are some of the benefits of using react?
Transcribing...
User said: "Okay so react is a library that makes it easy to build user interfaces."
transcribing...
Stored AI response as text: "what is components?"
Transcribing...
User said: "Components are reusable funtions"
Transcribing...
Stored AI response as text: "thanks you so much"
"""
`;
