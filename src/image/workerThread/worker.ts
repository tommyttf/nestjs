import { parentPort, threadId } from 'worker_threads';
import { MIME_JPEG, read } from 'jimp';

parentPort.on('message', (buffer) => {
  console.log(`running task on thread: ${threadId}`);
  read(Buffer.from(buffer))
    .then((image) => image.getBufferAsync(MIME_JPEG))
    .then((buffer: Buffer) => {
      parentPort.postMessage(buffer, [buffer.buffer]);
    });
});
