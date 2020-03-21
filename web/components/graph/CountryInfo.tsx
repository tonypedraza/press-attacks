import React, { FunctionComponent } from "react";
import countryInfoStyles from "../../styles/countryInfo";
import { Country } from "../../types/press-attacks";

interface CountryInfoProps {
  country: Country;
}

/*
This is the CountryInfo component that displays some information
about the selected country above the D3 graph.
*/

const CountryInfo: FunctionComponent<CountryInfoProps> = (
  props: CountryInfoProps
) => {
  const { country } = props;

  let countryName = country.name;

  countryName.charAt(0).toUpperCase();

  const pluralOrSingular =
    country.numJournalists > 1 ? "journalists" : "journalist";

  return (
    <div className="CountryInfo">
      {countryName ? (
        <p className="info-text">
          <span className="info-name">{countryName}</span>
          has {country.numJournalists} {pluralOrSingular} killed since 1992.
        </p>
      ) : (
        <p className="default-text">
          Select any of the countries on the left to see data. Then select any
          of the journalists to see their biography. Data is sourced from the{" "}
          <a target="_blank" rel="noopener noreferrer" href="https://cpj.org/">
            Committee to Protect Journalists
          </a>
          .
        </p>
      )}
      <style jsx>{countryInfoStyles}</style>
    </div>
  );
};

export default CountryInfo;
