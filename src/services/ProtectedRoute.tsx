import { observer } from "mobx-react-lite";
import { FC, memo } from "react";
import { Route, useHistory } from "react-router-dom";
import { RootStore } from "../store";

export const ProtectedRoute: FC<any> = observer(
  ({ component: Component, ...rest }) => {
    const history = useHistory();
    const { authStore } = RootStore();

    if (!authStore.loggedUser) {
      authStore
        .fetchActiveAccount()
        .then((res) => {
          return null;
        })
        .catch(() => {
          return history.push("/login");
        });
      return null;
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
);

export default memo(ProtectedRoute);
