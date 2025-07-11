import Link from "next/link";
import Image from "next/image";

// external components
import { twMerge } from "tailwind-merge";

// types
import type { CountryCardProps } from "./types";

export default function CountryCard({ country, darkMode }: CountryCardProps) {
  return (
    <Link href={`/country/${country.cca3}`}>
      <div
        className={twMerge(
          "rounded-md shadow overflow-hidden cursor-pointer transition hover:scale-105",
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        )}
      >
        <Image
          src={country.flags.svg}
          alt={country.name.common}
          width={0}
          height={0}
          className="w-full h-40 object-cover"
        />
        <div className="p-4 flex flex-col gap-1">
          <h2 className="font-bold text-lg mb-3">{country.name.common}</h2>
          <p className="text-sm">
            <span className="font-bold">Population: </span>
            {country.population.toLocaleString()}
          </p>
          <p className="text-sm">
            <span className="font-bold">Region: </span>
            {country.region}
          </p>
          <p className="text-sm">
            <span className="font-bold">Capital: </span>
            {country.capital?.[0]}
          </p>
        </div>
      </div>
    </Link>
  );
}
