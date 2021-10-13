import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.scss";
// import { RootStore } from "./store";
import Login from "./pages/Login";
import AppLayout from "./Layouts/AppLayout";
import ProtectedRoute from "./services/ProtectedRoute";

function App() {
  // const { authStore, appStore } = RootStore();

  return (
    <div className="relative w-screen h-screen overflow-hidden flex">
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <ProtectedRoute
            path="*"
            component={AppLayout}
          ></ProtectedRoute>
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
