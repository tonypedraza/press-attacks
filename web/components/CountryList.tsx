import React, { FunctionComponent } from "react";
import countryListStyles from "../styles/countryList";
import { GetCountriesComponent } from "../graphql/queries/getCountries.generated";
import { Country } from "../types/press-attacks";

interface CountryListProps {
  country: Country;
  onHandleShowCountry: Function;
}

/*
This is the CountryList component that shows the country buttons on the
left side of the application
*/

const CountryList: FunctionComponent<CountryListProps> = (
  props: CountryListProps
) => {
  const { country, onHandleShowCountry } = props;

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
    <GetCountriesComponent>
      {({ data, loading, error }) => {
        if (data && data.countries) {
          return (
            <div className="country-list">
              <ul className="country-list-links">
                {getCountryButtons(data.countries)}
              </ul>
              <style jsx global>
                {countryListStyles}
              </style>
            </div>
          );
        }
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return null;
      }}
    </GetCountriesComponent>
  );
};

export default CountryList;
