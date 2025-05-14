export const extractDate = (text: string): string | null => {
    // Exemplo: "amanhã", "15/05", "14/05/2025"
    const match = text.match(/\b(amanhã|\d{1,2}\/\d{1,2}(\/\d{2,4})?)\b/i);
    return match ? match[0] : null;
  };
  
  export const extractTime = (text: string): string | null => {
    // Exemplo: "15:00", "8h", "9:30"
    const match = text.match(/\b(\d{1,2}[:h]\d{0,2})\b/i);
    return match ? match[0].replace('h', ':') : null;
  };
  
  export const extractTitle = (text: string): string => {
    // Remove palavras como "amanhã", datas e horas
    return text
      .replace(/\b(amanhã|\d{1,2}\/\d{1,2}(\/\d{2,4})?)\b/gi, '')
      .replace(/\b(\d{1,2}[:h]\d{0,2})\b/gi, '')
      .trim();
  };
  
  export const buildISODateTime = (dateStr: string | null, timeStr: string | null): string | null => {
    if (!dateStr || !timeStr) return null;
  
    const now = new Date();
  
    let [day, month, year] = dateStr === 'amanhã'
      ? [now.getDate() + 1, now.getMonth() + 1, now.getFullYear()]
      : (dateStr.split('/').map(Number).concat(now.getFullYear())).slice(0, 3);
  
    const [hour, minute] = timeStr.split(':').map(Number);
  
    const iso = new Date(year, month - 1, day, hour, minute || 0);
    return iso.toISOString();
  };
  