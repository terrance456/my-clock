export interface ITimeZone {
  timeZone: string;
  label: string;
}

export const firstRowTimeZone: ITimeZone[] = [
  {
    timeZone: "America/Los_Angeles",
    label: "America, Los Angeles",
  },
  {
    timeZone: "Europe/Amsterdam",
    label: "Europe, Amsterdam",
  },
  {
    timeZone: "Europe/Berlin",
    label: "Europe, Berlin",
  },
];
export const secondRowTimeZone: ITimeZone[] = [
  {
    timeZone: "Europe/London",
    label: "Europe, London",
  },
  {
    timeZone: "Asia/Singapore",
    label: "Asia, Singapore",
  },
];
export const thirdRowTimeZone: ITimeZone[] = [
  {
    timeZone: "Asia/Kuala_Lumpur",
    label: "Asia, Kuala Lumpur",
  },
];
