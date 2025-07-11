export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const DATAREGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
