import React, { FunctionComponent } from "react";

interface Journalist {
  id: number;
  location: string;
  year: string;
  name: string;
  organization: string;
  date: string;
  killed: string;
  typeofdeath: string;
  specificlocation: string;
  freelance: string;
  description: string;
}

interface JournalistPaneProps {
  journalist: string;
  journalistData: any[];
  onHandleClosePane: Function;
}

const JournalistPane: FunctionComponent<JournalistPaneProps> = (
  props: JournalistPaneProps
) => {
  const { journalist, journalistData } = props;
  const result: Journalist = journalistData.find(
    entry => entry.name === journalist
  );

  return result ? (
    <div className="journalist-pane">
      <button
        className="close-pane-button"
        onClick={() => props.onHandleClosePane()}
      >
        Back
      </button>
      <p className="journalist-name">{result.name}</p>
      <p className="journalist-date">{result.date}</p>
      <p className="journalist-location">
        {result.specificlocation}, {result.location}
      </p>
      <p className="journalist-organization">{result.organization}</p>
      <p className="description">{result.description}</p>
      <style jsx>
        {`
          .journalist-pane {
            min-width: 100px;
            right: none;
            text-align: justify;
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
        `}
      </style>
    </div>
  ) : null;
};

export default JournalistPane;
