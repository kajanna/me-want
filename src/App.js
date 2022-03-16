import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import LoadingSpinner from "./shared/UIcustom/LoadingSpinner";
import Footer from "./shared/footer/Footer";
import Navigation from "./shared/navigation/Navigation";
import Users from "./user/pages/Users ";
import { useAuth } from "./shared/context/AuthContext";

import "./App.css";

const Auth = React.lazy(() => import("./user/pages/Auth"));
const EditItem = React.lazy(() => import("./items/pages/EditItem"));
const NewItem = React.lazy(() => import("./items/pages/NewItem"));
const ItemList = React.lazy(() => import("./items/pages/ItemList"));

const App = () => {
  const { token } = useAuth();
  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/new" exact>
          <NewItem />
        </Route>
        <Route path="/items/:itemId" exact>
          <EditItem />
        </Route>
        <Route path="/user/:userId" exact>
          <ItemList />
        </Route>
        <Route path="/" exact>
          <Users />
        </Route>
        <Redirect to="/" />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/user/:userId" exact>
          <ItemList />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/" exact>
          <Users />
        </Route>
        <Redirect to="/auth" />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <Navigation />
      <div className="main">
        <div className="content">
          <Suspense fallback={<LoadingSpinner />}>{routes}</Suspense>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
