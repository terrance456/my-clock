export const timeConverter = (date: Date, timeZone: string) => {
  return new Date(date).toLocaleTimeString("en-US", { timeZone: timeZone });
};
