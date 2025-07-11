"use client";

import { useState } from "react";

// external components
import useSWR from "swr";
import { twMerge } from "tailwind-merge";

// context
import { useTheme } from "../../context/context";

// types
import type { Country } from "./types";

// components
import Input from "../../components/input/input";
import Select from "../../components/select/select";
import CountryCard from "../../components/country-card/country-card";

// utils
import { DATAREGIONS, fetcher } from "./utils";

export default function HomePage() {
  const { theme: darkMode } = useTheme();
  const { data: countries, error } = useSWR(
    "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population,cca3",
    fetcher
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  if (error) return <div>Error cargando países</div>;
  if (!countries) return <div>Cargando...</div>;

  const filteredCountries = countries.filter((country: any) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter ? country.region === regionFilter : true;
    return matchesSearch && matchesRegion;
  });

  return (
    <main
      className={twMerge(
        "w-full px-5 md:px-10 py-10 min-h-screen transition-colors duration-300 gap-6",
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      )}
    >
      <div className="w-full flex flex-col md:flex-row justify-between gap-4 mb-6">
        <Input
          searchTerm={searchTerm}
          placeholder="Search for a country ..."
          setSearchTerm={setSearchTerm}
          className={twMerge(
            "w-full md:w-1/3 px-4 py-2 rounded-xs",
            darkMode
              ? "bg-gray-800 text-gray-100 placeholder-gray-400"
              : "bg-white text-gray-900 placeholder-gray-500"
          )}
        />
        <div className="w-1/2 flex flex-row md:justify-end">
          <Select
            data={DATAREGIONS}
            filter={regionFilter}
            setFilter={setRegionFilter}
            className={`p-2 rounded shadow-sm w-full sm:w-48 ${
              darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
        {filteredCountries.length === 0 ? (
          <p>No se encontraron países.</p>
        ) : (
          filteredCountries.map((country: Country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              darkMode={darkMode}
            />
          ))
        )}
      </div>
    </main>
  );
}
