export const formatDateLabel = (dateStr: string): string => {
  const inputDate = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  if (isSameDay(inputDate, today)) {
    return 'Today';
  }
  if (isSameDay(inputDate, yesterday)) {
    return 'Yesterday';
  }

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return `${
    months[inputDate.getMonth()]
  } ${inputDate.getDate()}, ${inputDate.getFullYear()}`;
};
