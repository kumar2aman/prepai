// createRawPcm.ts
import ffmpeg from 'fluent-ffmpeg';
import { PassThrough } from 'stream';

// You no longer need to set the path here because
// fluent-ffmpeg will find the system-installed ffmpeg.

// Function to convert WebM Buffer to PCM Buffer
export const webmToPCM = (base64Data: string): Promise<Buffer> => {
  // CHANGED: The function now accepts a base64 string.
  return new Promise((resolve, reject) => {
    
    // NEW: Convert the base64 string back into a Buffer.
    // The 'base64' encoding parameter is crucial here.
    const webMBuffer = Buffer.from(base64Data, 'base64');

    const inputStream = new PassThrough();
    // Pass the newly created Buffer to the stream.
    inputStream.end(webMBuffer);

    const outputChunks: Buffer[] = [];
    const command = ffmpeg(inputStream)
      .inputFormat('webm')
      .audioCodec('pcm_s16le') 
      .audioChannels(1)
      .audioFrequency(16000)
      .format('s16le'); 

    command.on('error', (err) => {
      console.error('ffmpeg error:', err.message);
      reject(new Error(`ffmpeg failed to convert audio: ${err.message}`));
    });

    command.on('end', () => {
      // This 'end' event signals that ffmpeg has finished processing.
      console.log('ffmpeg conversion finished successfully.');
      resolve(Buffer.concat(outputChunks));
    });
    
    // The command's output stream is piped to collect the PCM chunks.
    command.pipe()
      .on('data', (chunk: Buffer) => {
        outputChunks.push(chunk);
      });
  });
};