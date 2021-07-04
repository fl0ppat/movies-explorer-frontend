import { useEffect, useState } from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Footer from "../Footer/Footer";

import api from "../../utils/AuthApi";

import UserContext from "../../context/userContext";
import { ModalProvider } from "../../context/modalContext";

import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if (loggedIn) {
      api
        .getUser()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  function onLogin(token) {
    setLoggedIn(token);
    window.localStorage.setItem("token", token);
    api
      .getUser()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(err));
  }

  function onChangeProfile(name, email) {
    return api
      .editProfileData(name, email)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(err));
  }

  function likeFilm(id) {
    if (!currentUser.movies.includes(id)) {
      const newCurrentUser = currentUser;
      newCurrentUser.movies.push(id);
      setCurrentUser(newCurrentUser);
    }
  }

  function dislikeFilm(id) {
    if (currentUser.movies.includes(id)) {
      const newCurrentUser = currentUser;
      newCurrentUser.movies.filter((item) => item !== id);
      setCurrentUser(newCurrentUser);
      return true;
    }
  }

  function onSignOut() {
    api
      .signOut()
      .then(() => {
        setLoggedIn(null);
        window.localStorage.removeItem("token");
        setCurrentUser(null);
      })
      .catch((err) => console.error(err));
  }

  return (
    <UserContext.Provider value={currentUser}>
      <ModalProvider>
        <div className='App'>
          <HashRouter basename='/'>
            <Header loggedIn={loggedIn} />

            <Switch>
              <ProtectedRoute path='/movies' loggedIn={loggedIn} component={Movies} onLike={likeFilm} />
              <ProtectedRoute path='/saved-movies' loggedIn={loggedIn} component={Movies} onDislike={dislikeFilm} />
              <Route path='/signup'>
                <Register onLogin={onLogin} />
              </Route>
              <Route path='/signin'>
                <Login onLogin={onLogin} />
              </Route>
              <ProtectedRoute
                path='/profile'
                loggedIn={loggedIn}
                onSignOut={onSignOut}
                onChangeProfile={onChangeProfile}
                currentUser={currentUser}
                component={Profile}
              />
              <Route exact path='/'>
                <Main />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
            <Footer />
          </HashRouter>
        </div>
      </ModalProvider>
    </UserContext.Provider>
  );
}

export default App;
