import type { IncomingMessage } from "http";

export function buildRequestBody(request: IncomingMessage) {
  let body: unknown[] = [];
  return new Promise<string>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject("Request timed out");
    }, 3000);
    request
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        clearTimeout(timeout);
        try {
          const result = Buffer.concat(body as Uint8Array[]).toString();
          resolve(result);
        } catch (e) {
          reject(e);
        }
      });
  });
}
