import React, {
  useRef,
  useState,
  FunctionComponent,
  useEffect,
  useContext
} from "react";

import { AppContext } from "../appContext";
import JournalistPane from "./JournalistPane";
import pressattacksdata from "../../data/press_attacks_data.json";

interface JournalistNamesProps {
  pressAttacksYearSorted: any;
  country: String;
}

/*
This is the JournalistNames component that displays the names
of journalists on the right side of the application when a country
is selected. It also acts as the parent to the JournalistPane component.

Refs:
- names: the names div
- journalistContainer: the journalist-container div

Functions:
- handleChangeJournalist(name): Sets the journalist state variable to the
passed in name. Then sets the scrollTop and scrollLeft states before setting
- getJournalistButtonDivs(): Loops through pressAttacksYearSorted data and generates
the divs used in the name-section.
*/

const JournalistNames: FunctionComponent<JournalistNamesProps> = (
  props: JournalistNamesProps
) => {
  const { journalist, dispatchJournalist } = useContext(AppContext);
  const { scrollTop, dispatchScrollTop } = useContext(AppContext);
  const { scrollLeft, dispatchScrollLeft } = useContext(AppContext);
  const names = useRef<HTMLDivElement>(null);
  const journalistContainer = useRef<HTMLDivElement>(null);

  /* When the component updates, readjust the scroll to
  the previous names div position or set to 0 for the journalistContainer
  div */
  useEffect(() => {
    if (names && names.current) {
      names.current.scrollTop = scrollTop;
      names.current.scrollLeft = scrollLeft;
    } else if (journalistContainer.current) {
      journalistContainer.current.scrollTop = 0;
      journalistContainer.current.scrollLeft = 0;
    }
  });

  const handleChangeJournalist = (name: string) => {
    dispatchJournalist({ type: "SELECT", name: name });
    if (names.current) {
      dispatchScrollTop({
        type: "SELECTED_JOURNALIST",
        scrollValue: names.current.scrollTop
      });
      dispatchScrollLeft({
        type: "SELECTED_JOURNALIST",
        scrollValue: names.current.scrollTop
      });
    }
  };

  const { pressAttacksYearSorted, country } = props;

  const getJournalistButtonDivs = () => {
    let currentYear = 0;
    let journalistButtonDivs = [];
    let journalistButtons: any[] = [];
    pressAttacksYearSorted.forEach((entry: any, idx: number) => {
      if (entry.location === country) {
        if (entry.year !== currentYear) {
          if (currentYear !== 0) {
            journalistButtonDivs.push(
              <div className="name-section" key={currentYear}>
                {journalistButtons}
              </div>
            );
            journalistButtons = [];
          }
          currentYear = entry.year;
          journalistButtons.push(
            <p className="names-year" key={currentYear}>
              {currentYear}
            </p>
          );
        }
        journalistButtons.push(
          <button
            className="name-button"
            key={idx}
            value={entry.name}
            onClick={() => handleChangeJournalist(entry.name)}
          >
            {entry.name}
          </button>
        );
      }
    });

    //One last wrap for the end cases:
    journalistButtonDivs.push(
      <div className="name-section" key={currentYear}>
        {journalistButtons}
      </div>
    );

    //Most recent year to last
    journalistButtonDivs.reverse();

    return journalistButtonDivs;
  };

  return journalist !== "" ? (
    <div ref={journalistContainer} className="journalist-container">
      <JournalistPane
        journalist={journalist}
        journalistData={pressattacksdata}
        onHandleClosePane={() => dispatchJournalist({ type: "DESELECT" })}
      />
    </div>
  ) : (
    <div ref={names} className="names">
      {getJournalistButtonDivs()}
      <style jsx global>
        {`
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
        `}
      </style>
    </div>
  );
};

export default JournalistNames;
