import React, { FunctionComponent } from "react";
import journalistPaneStyles from "../../styles/journalistPane";
import { Journalist } from "../../types/press-attacks";

interface JournalistPaneProps {
  journalist: Journalist;
  onHandleClosePane: Function;
}

const JournalistPane: FunctionComponent<JournalistPaneProps> = (
  props: JournalistPaneProps
) => {
  const { journalist } = props;
  const attackDate = new Date(Date.parse(journalist.startDate)).toDateString();

  return (
    <div className="journalist-pane">
      <button
        className="close-pane-button"
        onClick={() => props.onHandleClosePane()}
      >
        Back
      </button>
      <p className="journalist-name">{journalist.fullName}</p>
      <p className="journalist-date">{attackDate}</p>
      <p className="journalist-location">{journalist.location}</p>
      <p className="journalist-organization">{journalist.organizations}</p>
      <p
        className="description"
        dangerouslySetInnerHTML={{ __html: `${journalist.body}` }}
      />
      <style jsx>{journalistPaneStyles}</style>
    </div>
  );
};

export default JournalistPane;
