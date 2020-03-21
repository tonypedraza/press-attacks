import css from "styled-jsx/css";

export default css.global`
  .names {
    padding-right: 15px;
    overflow: scroll;
  }
  .names-year {
    margin: 0;
    flex-shrink: 0;
    flex-grow: 0;
    display: inline;
    font-size: 3.33em;
  }
  .name-button {
    background-color: #ffffff;
    display: flex;
    align-items: left;
    text-align: left;
    justify: left;
    color: #747474;
    padding: 3px;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1.5em;
  }
  .name-button:hover {
    color: #e10000;
  }
  .journalist-container {
    overflow: scroll;
  }
  @media (max-width: 700px) {
    .names {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      height: 100%;
    }
    .name-section {
      display: flex;
      flex-direction: row;
      align-items: baseline;
    }
  }
`;
