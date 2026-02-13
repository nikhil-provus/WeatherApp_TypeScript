export const formatHour = (timeStr: string) => {
  const date = new Date(timeStr);
  const hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHour = hours % 12 || 12;
  return `${formattedHour} ${ampm}`;
};