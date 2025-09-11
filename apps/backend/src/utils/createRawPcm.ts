// createRawPcm.ts
import ffmpeg from 'fluent-ffmpeg';
import { PassThrough } from 'stream';

// You no longer need to set the path here because
// fluent-ffmpeg will find the system-installed ffmpeg.

// Function to convert WebM Buffer to PCM Buffer
export const webmToPCM = (data: Buffer): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const inputStream = new PassThrough();
    inputStream.end(data);

    const outputChunks: any[] = [];
    const command = ffmpeg(inputStream)
      .inputFormat('webm')
      .audioCodec('pcm_s16le')
      .audioChannels(1)
      .audioFrequency(16000)
      .format('s16le');

    command.on('error', (err) => {
      reject(err);
    });

    command.on('end', () => {
      resolve(Buffer.concat(outputChunks));
    });

    command.pipe(new PassThrough().on('data', chunk => outputChunks.push(chunk)), { end: true });
  });
};