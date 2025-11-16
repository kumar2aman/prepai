import { convertToText } from "../utils/assemblyaiSTT.js";

const queue: { chunk: string, resolve: Function }[] = [];
let isProcessing = false;

export function enqueue(chunk: string): Promise<string> {
  return new Promise((resolve) => {
    queue.push({ chunk, resolve });
    if (!isProcessing) processQueue();
  });
}

async function processQueue() {
  isProcessing = true;

  while (queue.length > 0) {
    const { chunk, resolve } = queue.shift()!;

    try {
      const response = await convertToText({ data: chunk });
      resolve(response);
    } catch (err) {
      resolve("");
    }
  }

  isProcessing = false;
}
