import { createContext, FC, PropsWithChildren, useContext } from "react";
import { AppStore } from "./appModule/AppStore";
import { AuthStore } from "./authModule/AuthStore";

type RootStateContextValue = {
  authStore: AuthStore;
  appStore: AppStore;
};

const RootStateContext = createContext<RootStateContextValue>(
  {} as RootStateContextValue
);

const authStore = new AuthStore();
const appStore = new AppStore();

export const RootStateProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <RootStateContext.Provider value={{ authStore, appStore }}>
      {children}
    </RootStateContext.Provider>
  );
};

export const RootStore = () => useContext(RootStateContext);
