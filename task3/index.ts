export const getUtcStringDate = (date?: Date) => {
  const inputDate = date || new Date();

  if (Number.isNaN(inputDate.getTime())) {
    return 'Invalid Date';
  }

  return inputDate.toISOString().replace(/\.\d{3}Z$/, 'Z');
};
