import { pipeline, env } from '@xenova/transformers';

env.allowLocalModels = true;

let tokenizerInstance: any = null;

export const loadTokenizer = async () => {
  if (tokenizerInstance) return tokenizerInstance;

  tokenizerInstance = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  return tokenizerInstance;
};

export const tokenizeText = async (text: string) => {
  const tokenizer = await loadTokenizer();
  const result = await tokenizer(text, {
    return_tensor: false,
  });

  // Estrutura:
  // result.inputs.input_ids
  // result.inputs.attention_mask

  return {
    input_ids: result.inputs.input_ids,
    attention_mask: result.inputs.attention_mask,
  };
};
