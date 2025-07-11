"use client";

import { useParams, useRouter } from "next/navigation";

// external components
import useSWR from "swr";
import { twMerge } from "tailwind-merge";

// context
import { useTheme } from "../../../../context/context";

// types
import { Country } from "@/app/types";

// components
import Tag from "../../../../components/tag/tag";
import Button from "../../../../components/button/button";
import IconComponent from "../../../../components/icon-component/icon-component";

// utils
import { fetcher } from "@/app/utils";

export default function CountryDetail() {
  const { theme: darkMode } = useTheme();
  const router = useRouter();
  const params = useParams();
  const code = params?.code;

  const { data: country, error } = useSWR<Country>(
    code
      ? `https://restcountries.com/v3.1/alpha/${code}?fields=name,flags,capital,population,region,subregion,tld,currencies,languages,borders`
      : null,
    fetcher
  );
  const bordersQuery = country?.borders?.length
    ? `https://restcountries.com/v3.1/alpha?codes=${country.borders.join(
        ","
      )}&fields=name,cca3`
    : null;

  const { data: borderCountries } = useSWR<Country[]>(bordersQuery, fetcher);

  if (error) return <div>Error cargando detalles del país</div>;
  if (!country) return <div>Cargando...</div>;

  return (
    <div
      className={twMerge(
        "w-full min-h-screen px-5 lg:px-10 py-10",
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      )}
    >
      <Button
        label="Back"
        onClick={() => router.back()}
        className={twMerge(
          "px-6 shadow mb-10",
          darkMode
            ? "text-gray-100 hover:shadow-white bg-gray-800"
            : "text-gray-900 hover:shadow-gray-800"
        )}
        iconLeft={
          <IconComponent
            iconName="ArrowLongLeftIcon"
            size={18}
            variant={darkMode ? "solid" : "outline"}
          />
        }
      />
      <div className="w-full flex flex-col lg:flex-row lg:items-stretch gap-2 lg:gap-20">
        <div
          className="lg:flex-1 bg-center bg-cover bg-no-repeat h-60 lg:h-auto"
          style={{ backgroundImage: `url(${country.flags.svg})` }}
        />
        <div className="flex-1 py-10">
          <h1 className="text-lg font-bold mb-4">{country.name.common}</h1>
          <div className="w-full flex flex-col lg:flex-row gap-8 justify-between mb-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm">
                <strong>Native Name:</strong> {country.name.official}
              </p>
              <p className="text-sm">
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>
              <p className="text-sm">
                <strong>Region:</strong> {country.region}
              </p>
              <p className="text-sm">
                <strong>Sub Region:</strong> {country.subregion}
              </p>
              <p className="text-sm">
                <strong>Capital:</strong> {country.capital?.[0] ?? "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm">
                <strong>Top Level Domain:</strong> {country.tld?.[0] ?? "N/A"}
              </p>
              <p className="text-sm">
                <strong>Currencies:</strong>{" "}
                {Object.entries(country.currencies ?? {})
                  .map(([code, { name, symbol }]) => `${name} (${symbol})`)
                  .join(", ")}
              </p>
              <p className="text-sm">
                <strong>Languages:</strong>{" "}
                {Object.values(country.languages ?? {}).join(", ")}
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col lg:flex-row lg:items-center gap-2">
            <strong className="text-sm">Border Countries:</strong>
            <div className="flex flex-wrap items-center gap-2">
              {borderCountries?.length ? (
                borderCountries.map((borderCountry) => (
                  <Tag
                    key={borderCountry.cca3}
                    label={borderCountry.name.common}
                    className={
                      darkMode
                        ? "bg-gray-800 text-gray-100 shadow-none"
                        : "bg-white text-gray-900"
                    }
                  />
                ))
              ) : (
                <span className="text-muted-foreground">
                  No border countries
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
