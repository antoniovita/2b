import { pipeline, env } from '@xenova/transformers';

env.allowLocalModels = false; 
env.cacheDir = 'transformers-cache';

let tokenizerInstance: any = null;

export const tokenizeText = async (text: string) => {
  if (!tokenizerInstance) {
    tokenizerInstance = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }

  const output = await tokenizerInstance(text, { return_tensor: false });

  return {
    input_ids: output.inputs.input_ids,
    attention_mask: output.inputs.attention_mask,
  };
};
