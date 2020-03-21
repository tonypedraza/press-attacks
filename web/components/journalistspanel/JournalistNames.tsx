/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useRef,
  FunctionComponent,
  useEffect,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";
import { AppContext } from "../appContext";
import JournalistPane from "./JournalistPane";
import pressattacksdata from "../../data/press_attacks_data.json";
import { Country, Journalist } from "../../types/press-attacks";
import { GetJournalistsByCountryComponent } from "../../graphql/queries/getJournalistsByCountry.generated";
interface JournalistNamesProps {
  pressAttacksYearSorted: any;
  country: Country;
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
  const [journalists, setJournalists] = useState([] as Journalist[]);
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
  const handleChangeJournalist = useCallback(
    (name: string) => {
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
    },
    [dispatchJournalist, dispatchScrollLeft, dispatchScrollTop]
  );
  const { country } = props;
  const getJournalistButtonDivs = useCallback(
    (journalists: any) => {
      if (journalists.length === 0) return null;
      let currentYear = 0;
      let journalistButtons: any[] = [];
      let result = [];
      journalists.forEach((entry: any, idx: number) => {
        let year = entry.year.slice(0, 4);
        if (year !== currentYear) {
          if (currentYear !== 0) {
            result.push(
              <div className="name-section" key={currentYear}>
                {journalistButtons}
              </div>
            );
            journalistButtons = [];
          }
          currentYear = year;
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
            value={entry.fullName}
            onClick={() => handleChangeJournalist(entry.fullName)}
          >
            {entry.fullName}
          </button>
        );
      });
      //One last wrap for the end cases:
      result.push(
        <div className="name-section" key={currentYear}>
          {journalistButtons}
        </div>
      );
      return result;
    },
    [handleChangeJournalist]
  );
  const journalistButtonDivs = useMemo(
    () => getJournalistButtonDivs(journalists),
    [getJournalistButtonDivs, journalists]
  );

  return (
    <GetJournalistsByCountryComponent
      variables={{
        country: {
          id: country.id
        }
      }}
    >
      {({ data, loading, error }) => {
        if (data && data.journalists) {
          setJournalists(data.journalists);
          return journalist !== "" ? (
            <div ref={journalistContainer} className="journalist-container">
              <JournalistPane
                journalist={journalist}
                journalistData={pressattacksdata}
                onHandleClosePane={() =>
                  dispatchJournalist({ type: "DESELECT" })
                }
              />
            </div>
          ) : (
            <div ref={names} className="names">
              {journalistButtonDivs}
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
        }
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return null;
      }}
    </GetJournalistsByCountryComponent>
  );
};
export default JournalistNames;
