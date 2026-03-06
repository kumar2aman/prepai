let audioContext: AudioContext | null = null;
let processor: ScriptProcessorNode | null = null;
let source: MediaStreamAudioSourceNode | null = null;
let stream: MediaStream | null = null;

let isRecording = false;

export async function startRecording(onData: (base64Chunk: string) => void) {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: { channelCount: 1, sampleRate: 16000, echoCancellation: true, noiseSuppression: true },
  });

  audioContext = new AudioContext({ sampleRate: 16000 });
  source = audioContext.createMediaStreamSource(stream);
  processor = audioContext.createScriptProcessor(4096, 1, 1);

  isRecording = true;
  processor.onaudioprocess = (event) => {
    if (!isRecording) return;
    const inputData = event.inputBuffer.getChannelData(0);
    const pcmData = new Int16Array(inputData.length);
    for (let i = 0; i < inputData.length; i++) pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7fff;

    const base64 = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
    onData(base64);
  };

  source.connect(processor);
  processor.connect(audioContext.destination);
}

export function stopRecording() {
  isRecording = false;
  processor?.disconnect();
  source?.disconnect();
  audioContext?.close();
  stream?.getTracks().forEach((track) => track.stop());

  processor = null;
  source = null;
  audioContext = null;
  stream = null;
}