import { chatHistory } from "../api/v1/geminiAudio.js";


export const prompt = `

Act as a software interviewer on give points, Analyze the following chat between the user and AI interviewer. Based on the user's performance, return a JSON object with the following fields only:

- progress (String)
- score (Int)
- level (Int)
- accuracy (Int)
- streak (Int)

Use the chat to estimate how well the user is doing in the interview. Do not add any explanation or extra output — only return the JSON object.
note:-
1. user chat can be in hindi or any indian lanuage,
2. also give points to user on their performance,
3. dont give zero score to user if they are not doing well,
4. also give accuracy to user based on their performance in interview,
5. in progress give user progrees in three categories (intermediate, advanced, expert), based on their performance in interview, dont leave it blank or zoro,

Chat:

"""
${chatHistory.map((message) => `${message.role}: ${message.text}`).join("\n")}


"""


`;
