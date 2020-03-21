import css from "styled-jsx/css";

export default css.global`
  html,
  body,
  #__next {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    font-family: "Roboto", sans-serif;
  }

  .app {
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-left: 10px;
    margin-right: 10px;
  }

  .title {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 5em;
    font-weight: 700;
    height: 50%;
  }

  .subtitle {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 3.33em;
    color: #747474;
    font-weight: 400;
  }

  .container {
    margin-top: 15px;
    display: flex;
    height: 78%;
  }

  .left-side {
    width: 80%;
    min-width: 120px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    display: flex;
  }

  .right-side {
    min-width: 100px;
    width: 20%;
    margin-right: 20px;
    display: flex;
  }

  /* Graph Container */

  .graph-info {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .graph-container {
    min-width: 350px;
    max-width: 2000px;
    flex-shrink: 1;
    width: 100%;
    height: 100%;
  }

  .domain {
    fill: none;
    stroke: none;
  }

  @media (max-width: 700px) {
    .app {
      height: auto;
      flex-direction: column;
      justify-content: flex-start;
    }

    .left-side {
      width: 100%;
      height: 70%;
    }

    .right-side {
      width: 100%;
      height: 30%;
    }

    .title {
      font-size: 3em;
    }
    .subtitle {
      font-size: 2em;
    }

    .container {
      flex-direction: column;
    }

    .graph-info {
      width: 100%;
    }
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
  }
  .x.axis path {
    display: none;
  }

  .line {
    fill: none;
    stroke: #e10000;
    stroke-width: 2px;
  }
`;
