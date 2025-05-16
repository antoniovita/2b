import { Tensor } from 'onnxruntime-react-native';

export const createInputTensors = (
  input_ids: number[],
  attention_mask: number[]
) => {
  const batch = 1;
  const length = input_ids.length;

  const toTensor = (data: number[]) =>
    new Tensor('int64', BigInt64Array.from(data.map(BigInt)), [batch, length]);

  return {
    input_ids: toTensor(input_ids),
    attention_mask: toTensor(attention_mask),
  };
};
