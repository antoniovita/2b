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

  try {
    await RNFS.copyFileAssets(modelPath, destPath);
    session = await InferenceSession.create(destPath);
    console.log('✅ Modelo ONNX carregado com sucesso!');
    return session;
  } catch (err) {
    console.error('❌ Erro ao carregar modelo ONNX:', err);
    throw err;
  }
};

export const runModel = async ({
  input_ids,
  attention_mask,
}: {
  input_ids: Tensor;
  attention_mask: Tensor;
}) => {
  if (!session) await loadModel();

  const feeds: Record<string, Tensor> = {
    input_ids,
    attention_mask,
  };

  try {
    const results = await session!.run(feeds);
    return results;
  } catch (err) {
    console.error('❌ Erro ao rodar modelo:', err);
    throw err;
  }
};
