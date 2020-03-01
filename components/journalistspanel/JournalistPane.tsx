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
  const handleClosePane = () => {
    props.onHandleClosePane();
  };

  const { journalist, journalistData } = props;
  const result: Journalist = journalistData.find(
    entry => entry.name === journalist
  );

  return result ? (
    <div className="journalistPane">
      <button className="closePaneButton" onClick={() => handleClosePane()}>
        Back
      </button>
      <p className="journalist-name">{result.name}</p>
      <p className="journalist-date">{result.date}</p>
      <p className="journalist-location">
        {result.specificlocation}, {result.location}
      </p>
      <p className="journalist-organization">{result.organization}</p>
      <p className="description">{result.description}</p>
    </div>
  ) : null;
};

export default JournalistPane;
