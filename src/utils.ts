import { CountryDetails } from "./types/CountryDetails.type";

export const formatDataCountryLabels = (data: string[]) => {
  const countryNames: string[] = [...data];
  let newCountryNames: CountryDetails[] = [];

  countryNames.map((value: string) =>
    newCountryNames.push({
      timeZone: value,
      label: value.replaceAll("/", ", ").replaceAll("_", " "),
      searchLabel: value.replaceAll("/", " ").replaceAll("_", " "),
    })
  );
  return newCountryNames;
};

export const splitDataIntoChunks = (data: string[], chunkSize: number) => {
  const formattedData: CountryDetails[] = formatDataCountryLabels(data);
  let newData: any = [];
  for (let i: number = 0; i <= formattedData.length; i += chunkSize) {
    newData.push(formattedData.slice(i, i + chunkSize));
  }
  return newData;
};
