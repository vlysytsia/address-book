import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import NavBar from "./components/NavBar";
import Loader from "./components/Loading";
import store from "./store";

const Home = lazy(() => import("./components/Home"));
const Settings = lazy(() => import("./components/Settings"));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <NavBar />
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
