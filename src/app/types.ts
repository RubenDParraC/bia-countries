export type Country = {
  capital: string[];
  cca3: string;
  flags: Flag;
  name: Name;
  population: number;
  region: string;
  subregion?: string;
  tld?: string[];
  currencies?: Record<string, Currency>;
  languages?: Record<string, string>;
  borders?: string[];
};

export interface Flag {
  alt: string;
  png: string;
  svg: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName?: Record<string, { official: string; common: string }>;
}

export interface Currency {
  name: string;
  symbol: string;
}
