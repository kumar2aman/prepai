// createWebmFromRawPcm.ts
import ffmpeg from 'fluent-ffmpeg';
import { PassThrough } from 'stream';

/**
 * Converts raw PCM audio (16-bit signed integer) to WebM using ffmpeg.
 * 
 * @param base64Pcm - Base64-encoded raw PCM audio
 * @param sampleRate - Sample rate of the input PCM (e.g., 24000)
 * @returns Promise that resolves with a WebM Buffer
 */
export const rawPcmToWebM = (base64Pcm: string, sampleRate = 24000): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const pcmBuffer = Buffer.from(base64Pcm, 'base64');

    const inputStream = new PassThrough();
    inputStream.end(pcmBuffer);

    const outputChunks: Buffer[] = [];

    const command = ffmpeg(inputStream)
      .inputFormat('s16le') // raw PCM 16-bit signed little endian
      .audioFrequency(sampleRate)
      .audioChannels(1)
      .audioCodec('libopus') // or 'libvorbis' if you prefer
      .format('webm')
      .on('error', (err) => {
        console.error('ffmpeg error:', err.message);
        reject(new Error(`ffmpeg failed to convert audio: ${err.message}`));
      })
      .on('end', () => {
      
        resolve(Buffer.concat(outputChunks));
      });

    command.pipe().on('data', (chunk: Buffer) => {
      outputChunks.push(chunk);
    });
  });
};
