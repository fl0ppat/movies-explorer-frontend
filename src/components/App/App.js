import { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Footer from "../Footer/Footer";

// eslint-disable-next-line no-unused-vars
import UserContext from "../../context/userContext";

import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  function debugUserSet(state) {
    setCurrentUser(state);
  }

  useEffect(() => {
    debugUserSet(1);
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      <div className='App'>
        <BrowserRouter>
          <Header />

          <Switch>
            <Route path='/movies'>
              <Movies />
            </Route>
            <Route path='/saved-movies'>
              <SavedMovies />
            </Route>
            <Route path='/signup'>
              <Register />
            </Route>
            <Route path='/signin'>
              <Login />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
