import css from "styled-jsx/css";

export default css`
  .journalist-pane {
    min-width: 100px;
    right: none;
    height: 100%;
    overflow: scroll;
  }

  .journalist-pane p {
    margin: 5px;
  }

  .close-pane-button {
    margin-top: 15px;
    margin-bottom: 25px;
    background-color: #ffffff;
    /* margin-left: -7px; */
    border: none;
    outline: none;
    font-size: 1.5em;
    cursor: pointer;
  }

  .close-pane-button:hover {
    color: #e10000;
  }

  .journalist-name {
    font-size: 3em;
    text-align: left;
    font-weight: 700;
  }

  .journalist-date {
    padding-top: 20px;
    font-size: 2em;
    text-align: left;
  }

  .journalist-location {
    font-size: 2em;
    text-align: left;
  }

  .journalist-organization {
    padding-top: 20px;
    font-size: 2em;
    text-align: left;
  }

  .description {
    padding-top: 20px;
    padding-right: 15px;
    text-justify: inter-word;
  }

  @media (max-width: 700px) {
    .journalist-name {
      font-size: 2em;
    }

    .journalist-date {
      font-size: 1em;
    }

    .journalist-location {
      font-size: 1em;
    }

    .journalist-organization {
      font-size: 1em;
    }
  }
`;
