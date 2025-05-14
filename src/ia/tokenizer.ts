import { BertTokenizer } from 'bert-tokenizer';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

let tokenizer: BertTokenizer | null = null;

export async function getTokenizer(): Promise<BertTokenizer> {
  if (tokenizer) return tokenizer;

  const asset = Asset.fromModule(require('../../assets/model/miniLM/vocab.txt'));
  await asset.downloadAsync();

  const vocabPath = asset.localUri!;
  const vocabText = await FileSystem.readAsStringAsync(vocabPath);
  tokenizer = new BertTokenizer({ vocab: vocabText.split('\n') });

  return tokenizer;
}
