import { Tensor } from 'onnxruntime-react-native';

export const createInputTensors = (input_ids: number[], attention_mask: number[]) => {
  const batchSize = 1;
  const sequenceLength = input_ids.length;

  const inputTensor = new Tensor('int64', BigInt64Array.from(input_ids.map(BigInt)), [batchSize, sequenceLength]);
  const attentionTensor = new Tensor('int64', BigInt64Array.from(attention_mask.map(BigInt)), [batchSize, sequenceLength]);

  return {
    input_ids: inputTensor,
    attention_mask: attentionTensor,
  };
};
