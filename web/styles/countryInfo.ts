import css from "styled-jsx/css";

export default css`
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
`;
