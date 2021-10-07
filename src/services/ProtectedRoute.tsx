import { FC, memo } from "react";
import { Route } from "react-router-dom";
import { RootStore } from "../store";
// import { useFetchActiveUser } from "./Router.service";

export const ProtectedRoute: FC<any> = ({ component: Component, ...rest }) => {
  const { appStore } = RootStore();

  // useFetchActiveUser();
  // pozovi sesiju umesto useFetchActiveUser

  if (!appStore.loggedUser) {
    return null;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default memo(ProtectedRoute);
