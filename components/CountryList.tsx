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
    <div className="CountryList">
      <ul className="CountryList-links">{buttons}</ul>
    </div>
  );
};

export default CountryList;
