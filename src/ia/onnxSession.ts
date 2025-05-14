import * as ort from 'onnxruntime-web';

let session: ort.InferenceSession | null = null;

export async function getSession(): Promise<ort.InferenceSession> {
  if (session) return session;

  session = await ort.InferenceSession.create(
    require('../../assets/model/miniLLM/model.onnx'),
    { executionProviders: ['wasm'] }
  );

  return session;
}
