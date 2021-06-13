import { Route, Switch, BrowserRouter } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";

import "./App.css";
//import { useState } from 'react';

function App() {
  //const [loggedIn] = useState(true)

  return (
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
          <Route path='/'>
            <Main />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
