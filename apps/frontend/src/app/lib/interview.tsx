import { GoogleGenAI, Modality } from '@google/genai';

// Use the token generated in the "Create an ephemeral token" section here
const ai = new GoogleGenAI({
  apiKey:  "rgkwrhewjiohjsadiobjadoihjewihjeio"
});
const model = 'gemini-2.0-flash-live-001';
const config = { responseModalities: [Modality.TEXT] };

async function main() {

  const session = await ai.live.connect({
    model: model,
    config: config,
    callbacks: { 
         onopen: () => console.log('Connected'),
      onmessage: (msg) => console.log(msg),
      onerror: (e) => console.error('Error:', e),
      onclose: () => console.log('Closed'),
    },
  });

  // Send content...

  session.close();
}

main();