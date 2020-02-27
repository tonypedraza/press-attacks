import React, { FunctionComponent } from "react";

interface CountryInfoProps {
  country: String;
  numAttacks: number;
}

const CountryInfo: FunctionComponent<CountryInfoProps> = (
  props: CountryInfoProps
) => {
  const { country, numAttacks } = props;

  country.charAt(0).toUpperCase();

  const pluralOrSingular = numAttacks > 1 ? "journalists" : "journalist";

  return country ? (
    <div className="CountryInfo">
      <p className="info-text">
        <span className="info-name">{country}</span>
        has {numAttacks} {pluralOrSingular} killed since 1992.
      </p>
    </div>
  ) : (
    <div className="CountryInfo">
      <p className="default-text">
        Select any of the countries on the left to see data. Then select any of
        the journalists to see their biography. Data is sourced from the{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://cpj.org/">
          Committee to Protect Journalists
        </a>
        .
      </p>
    </div>
  );
};

export default CountryInfo;
