import { createContext } from "react";

export interface AppContextInterface {
  scrollTop: number;
  dispatchScrollTop: Function;
  scrollLeft: number;
  dispatchScrollLeft: Function;
  journalist: string;
  dispatchJournalist: Function;
}
export const AppContext = createContext<AppContextInterface>({
  scrollTop: 0,
  dispatchScrollTop: () => {},
  scrollLeft: 0,
  dispatchScrollLeft: () => {},
  journalist: "",
  dispatchJournalist: () => {}
});
