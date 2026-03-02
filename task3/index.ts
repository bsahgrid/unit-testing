export const getUtcStringDate = (date?: Date) => {
  const inputDate = date || new Date();

  return inputDate.toISOString().replace(/\.\d{3}Z$/, 'Z');
};
