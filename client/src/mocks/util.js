export const getNextXMonth = (monthOffset = 1) => {
  const date = new Date();
  date.setMonth(date.getMonth() + monthOffset);
  return date;
};
/**
 * This is important in development.
 * You are in appointment-detail/30 page
 * When you refresh your page you need to have the 30 value.
 * This is why we are using sequential id here.
 * @returns 
 */
export const sequentialNumberPrimaryKey = () => {
  let i = 0;
  return () => ++i;
};
