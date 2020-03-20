import React, { FunctionComponent } from "react";
import { GetCountriesComponent } from "../graphql/queries/getCountries.generated";

interface CountryListProps {
  country: string;
  onHandleShowCountry: Function;
}
interface Country {
  id: string;
  name: string;
  __typename: string;
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
            entry.name === country ? "location-selected" : "location-button"
          }
          value={entry.name}
          onClick={() => onHandleShowCountry(entry.name)}
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
                {`
                  .country-list {
                    list-style: none;
                    min-width: 120px;
                    max-width: 200px;
                    width: 15%;
                    overflow: scroll;
                    font-size: 1.5em;
                  }

                  .country-list-links {
                    list-style-type: none;
                    margin: 0;
                    padding: 0;
                  }

                  .location-button {
                    text-align: left;
                    background-color: #ffffff;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 0.75em;
                  }

                  .location-button:hover {
                    color: #747474;
                  }

                  .location-selected {
                    background-color: #ffffff;
                    text-align: left;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 0.75em;
                    color: #e10000;
                  }

                  @media (max-width: 700px) {
                    .country-list {
                      max-width: 100%;
                      width: 100%;
                    }

                    .country-list-links {
                      display: flex;
                      flex-direction: row;
                    }
                  }
                `}
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
