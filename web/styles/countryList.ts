import css from "styled-jsx/css";

export default css.global`
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
`;
