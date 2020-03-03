import React, { FunctionComponent } from "react";

interface CountryInfoProps {
  country: String;
  numAttacks: number;
}

/*
This is the CountryInfo component that displays some information
about the selected country above the D3 graph.
*/

const CountryInfo: FunctionComponent<CountryInfoProps> = (
  props: CountryInfoProps
) => {
  const { country, numAttacks } = props;

  country.charAt(0).toUpperCase();

  const pluralOrSingular = numAttacks > 1 ? "journalists" : "journalist";

  return (
    <div className="CountryInfo">
      {country ? (
        <p className="info-text">
          <span className="info-name">{country}</span>
          has {numAttacks} {pluralOrSingular} killed since 1992.
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
      <style jsx>
        {`
          .info-text {
            margin: 0;
            margin-left: 20px;
            max-width: 960px;
            font-size: 1.25em;
            color: #747474;
            font-weight: 700;
          }

          .info-name {
            font-size: 2.5em;
            color: #e10000;
            font-weight: 400;
            padding-right: 5px;
          }

          .default-text {
            margin: 18px;
            font-size: 1.25em;
            color: #747474;
            font-weight: 700;
          }

          .default-text a {
            text-decoration: underline;
            color: #747474;
          }

          .default-text a:visited {
            text-decoration: none;
            color: #747474;
          }

          .default-text a:hover {
            color: black;
          }

          @media (max-width: 700px) {
            .info-name {
              font-size: 2em;
            }

            .info-text {
              font-size: 1em;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CountryInfo;
