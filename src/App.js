import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { CircularProgress } from "@material-ui/core";

import Footer from './shered/footer/Footer';
import Navigation from './shered/navigation/Navigation';
import Users from './user/pages/Users ';
import { useAuth} from './shered/context/AuthContext';

import './App.css';

const Auth = React.lazy(() => import('./user/pages/Auth'));
const EditItem = React.lazy(() => import('./items/pages/EditItem'));
const NewItem = React.lazy(() => import('./items/pages/NewItem'));
const ItemList = React.lazy(() => import('./items/pages/ItemList'));

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
        <Route path="*" >
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
        <Route path="*" >
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
          <Suspense fallback={<div className="center"><CircularProgress color="secondary" /></div> }>  {routes}
          </Suspense></div>
      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
