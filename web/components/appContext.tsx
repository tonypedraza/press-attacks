import { createContext } from "react";
import { Journalist } from "../types/press-attacks";

export interface AppContextInterface {
  scrollTop: number;
  dispatchScrollTop: Function;
  scrollLeft: number;
  dispatchScrollLeft: Function;
  journalist: Journalist;
  dispatchJournalist: Function;
}
export const AppContext = createContext<AppContextInterface>({
  scrollTop: 0,
  dispatchScrollTop: () => {},
  scrollLeft: 0,
  dispatchScrollLeft: () => {},
  journalist: {
    id: ""
  },
  dispatchJournalist: () => {}
});
