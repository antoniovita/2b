export const extractDate = (text: string): string | null => {
  const match = text.match(/\b(amanhã|\d{1,2}\/\d{1,2})\b/i);
  return match?.[0] || null;
};

export const extractTime = (text: string): string | null => {
  const match = text.match(/\b\d{1,2}[:h]\d{0,2}\b/i);
  return match?.[0]?.replace('h', ':') || null;
};

export const extractTitle = (text: string): string => {
  return text
    .replace(/\b(amanhã|\d{1,2}\/\d{1,2})\b/gi, '')
    .replace(/\b\d{1,2}[:h]\d{0,2}\b/gi, '')
    .trim();
};

export const buildISODateTime = (dateStr: string | null, timeStr: string | null): string | null => {
  if (!dateStr || !timeStr) return null;

  const now = new Date();
  const [day, month] =
    dateStr === 'amanhã'
      ? [now.getDate() + 1, now.getMonth() + 1]
      : dateStr.split('/').map(Number);

  const [hour, minute] = timeStr.split(':').map(Number);

  const fullDate = new Date(now.getFullYear(), month - 1, day, hour, minute || 0);
  return fullDate.toISOString();
};
