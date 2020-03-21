import React, { FunctionComponent } from "react";
import countryListStyles from "../styles/countryList";
import { Country } from "../types/press-attacks";

interface CountryListProps {
  country: Country;
  countries: Country[];
  onHandleShowCountry: Function;
}

/*
This is the CountryList component that shows the country buttons on the
left side of the application
*/

const CountryList: FunctionComponent<CountryListProps> = (
  props: CountryListProps
) => {
  const { country, countries, onHandleShowCountry } = props;

  const getCountryButtons = (countries: Country[]) => {
    return countries.map((entry: Country, idx: number) => (
      <li key={idx}>
        <button
          className={
            entry.name === country.name
              ? "location-selected"
              : "location-button"
          }
          value={entry.name}
          onClick={() => onHandleShowCountry(entry)}
        >
          {entry.name}
        </button>
      </li>
    ));
  };

  return (
    <div className="country-list">
      <ul className="country-list-links">{getCountryButtons(countries)}</ul>
      <style jsx global>
        {countryListStyles}
      </style>
    </div>
  );
};

export default CountryList;
