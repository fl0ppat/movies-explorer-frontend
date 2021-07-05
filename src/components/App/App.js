import { useEffect, useState } from "react";
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
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
  const history = useHistory();

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
    window.localStorage.setItem("token", token);
    api
      .getUser()
      .then((data) => {
        setCurrentUser(data);
        setLoggedIn(token);
        console.log("Установил юзера");
      })
      .then(history.push("/movies"))
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
    if (id && !currentUser.movies.includes(id)) {
      const newCurrentUser = currentUser;
      newCurrentUser.movies.push(id);
      setCurrentUser(newCurrentUser);
    }
  }

  function dislikeFilm(id) {
    if (currentUser.movies.includes(id)) {
      const newCurrentUser = currentUser;
      newCurrentUser.movies = newCurrentUser.movies.filter((item) => item !== id);
      setCurrentUser(newCurrentUser);
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
          <Header loggedIn={loggedIn} />
          <Switch>
            <ProtectedRoute
              path={["/movies", "/saved-movies"]}
              loggedIn={loggedIn}
              component={Movies}
              onLike={likeFilm}
              onDislike={dislikeFilm}
            />
            <Route path='/signup'>
              <Register onLogin={onLogin} setCurrentUser={setLoggedIn} />
            </Route>
            <Route path='/signin'>
              <Login onLogin={onLogin} setCurrentUser={setLoggedIn} />
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
        </div>
      </ModalProvider>
    </UserContext.Provider>
  );
}

export default withRouter(App);
