import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.scss";
import { RootStore } from "./store";
import Login from "./pages/Login";

function App() {
  const { authStore, appStore } = RootStore();

  console.log(authStore);
  console.log(appStore);

  return (
    <div className="relative w-screen h-screen overflow-hidden flex">
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          {/* <ProtectedRoute
            path="*"
            component={AppLayoutNavigation}
          ></ProtectedRoute> */}
          <Route path="*" exact>
            <Redirect to={{ pathname: "/login" }} />
          </Route>
        </Switch>
      </Router>
      {/* <Loader /> */}
    </div>
  );
}

export default App;
