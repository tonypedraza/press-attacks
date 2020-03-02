import React, { FunctionComponent } from "react";

interface CountryListProps {
  countriesData: any;
  country: String;
  onHandleShowCountry: Function;
}

const CountryList: FunctionComponent<CountryListProps> = (
  props: CountryListProps
) => {
  const handleShowCountryChange = (location: String) => {
    props.onHandleShowCountry(location);
  };

  const { countriesData, country } = props;

  // Create an array of buttons, one for each country:
  let buttons: JSX.Element[] = [];
  countriesData.forEach((entry: any, i: number) => {
    let className =
      entry.location === country ? "location-selected" : "location-button";
    let button: JSX.Element = (
      <li key={i}>
        <button
          className={className}
          value={entry.location}
          onClick={() => handleShowCountryChange(entry.location)}
        >
          {entry.location}
        </button>
      </li>
    );
    buttons.push(button);
  });

  return (
    <div className="country-list">
      <ul className="country-list-links">{buttons}</ul>
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
};

export default CountryList;
