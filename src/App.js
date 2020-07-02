import React, {useState, useCallback} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Users from './users/pages/Users';
import NewEvent from './events/pages/NewEvent';
import UserEvents from './events/pages/UserEvents';
import UpdateEvent from './events/pages/UpdateEvent';
import Auth from './users/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import {AuthContext} from './shared/context/auth-context';

const App = () => { 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    //useCallback to avoid infinity loops
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    //useCallback to avoid infinity loops
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn){
    routes =(
      <Switch>

       <Route path="/" exact>
          <Users/> 
        </Route>

        <Route path="/:userId/events" exact>
        <UserEvents/> 
        </Route>

        <Route path="/events/new" exact>
          <NewEvent/> 
        </Route>

        <Route path="/events/:eventsId">
        {/* this has to be place after event/new, the order matters here,as it need to enter in event/new before. */}
          <UpdateEvent /> 
      </Route>
          <Redirect to="/" /> {/*If what is incorrect after this slash then it will redirect to / nothing after */}

      </Switch>
    );
  } else {
    routes = (
      <Switch>


        <Route path="/auth">
          <Auth/> 
        </Route>
        <Redirect to="/auth" /> 

      </Switch>
      /* stop the render the next path after it render the one written in the URL */
   );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout:logout}}>
      <Router>
      {/* <Title/> */}
          <MainNavigation/>{/* before the switch as I want to show this nav bar doesn't matter which URL is called for other componants */}
          <main> {routes}</main>  {/* main component placed here to get some padding between nav bar and event */}
        </Router>
      </AuthContext.Provider>
  );
};

export default App;
