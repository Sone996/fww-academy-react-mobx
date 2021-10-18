import { createContext, FC, PropsWithChildren, useContext } from "react";
import { AppStore } from "./appModule/AppStore";
import { AuthStore } from "./authModule/AuthStore";
import { CourseStore } from "./courseModule/CourseStore";
import { PersonStore } from "./personeModule/PersonStore";

type RootStateContextValue = {
  authStore: AuthStore;
  appStore: AppStore;
  courStore: CourseStore;
  personStore: PersonStore;
};

const RootStateContext = createContext<RootStateContextValue>(
  {} as RootStateContextValue
);

const authStore = new AuthStore();
const appStore = new AppStore();
const courStore = new CourseStore();
const personStore = new PersonStore();

export const RootStateProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  // console.log('ROOT',  authStore.loggedUser)
  return (
    <RootStateContext.Provider
      value={{ authStore, appStore, courStore, personStore }}
    >
      {children}
    </RootStateContext.Provider>
  );
};

export const RootStore = () => useContext(RootStateContext);
