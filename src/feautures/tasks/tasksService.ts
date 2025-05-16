import { tokenizeText } from '../nlp/tokenizer';
import { createInputTensors } from '../nlp/utils';
import { runModel } from '../nlp/inference';

import { extractTitle, extractDate, extractTime, buildISODateTime } from './tasksUtils';
import { createTask } from '../../services/taskService';

export const processTaskFromText = async (text: string, user_id: string) => {
  const { input_ids, attention_mask } = await tokenizeText(text);
  const tensors = createInputTensors(input_ids, attention_mask);

  await runModel(tensors);

  const title = extractTitle(text);
  const date = extractDate(text);
  const time = extractTime(text);
  const datetime = buildISODateTime(date, time);

  const task = {
    title,
    description: text,
    date: datetime ?? undefined,
    type: 'task',
    completed: 0,
    user_id,
  };

  await createTask(task);
  return task;
};
