import { InferenceSession, Tensor } from 'onnxruntime-react-native';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

let session: InferenceSession | null = null;

export const loadModel = async () => {
  if (session) return session;

  const modelPath =
    Platform.OS === 'ios'
      ? `${RNFS.MainBundlePath}/assets/model/model_fp16.onnx`
      : 'models/model_fp16.onnx';

  const destPath = `${RNFS.TemporaryDirectoryPath}/model_fp16.onnx`;

  await RNFS.copyFileAssets(modelPath, destPath);
  session = await InferenceSession.create(destPath);
  return session;
};

export const runModel = async ({
  input_ids,
  attention_mask,
}: {
  input_ids: Tensor;
  attention_mask: Tensor;
}) => {
  if (!session) await loadModel();
  const outputs = await session!.run({ input_ids, attention_mask });
  return outputs;
};
