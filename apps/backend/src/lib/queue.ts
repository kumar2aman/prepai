import { convertToText } from "../utils/assemblyaiSTT.js";

const queue: string[] = [];

let isProcessing = false;

export function enqueue(chunk: string) {
  queue.push(chunk);
  if (!isProcessing) return processQueue();
}

async function processQueue() {
 
  while (queue.length > 0) {
    const chunk = queue.shift();
    if (!chunk) return "chunk is undefined";
    const response = await convertToText({ data: chunk }); // await ensures no overlap
    if(!response) return "response is undefined";
    return response;
  }
}
