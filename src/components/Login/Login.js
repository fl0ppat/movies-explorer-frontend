/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "../SignForm/SignForm.css";
import handleInput from "../../utils/validator";
import auth from "../../utils/AuthApi";
import { ModalContext } from "../../context/modalContext";
import Preloader from "../Preloader/Preloader";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let { handleModal, closeModal } = useContext(ModalContext);

  function handleButtonDisabling(e) {
    if (email.length > 0 && password.length > 0 && e.target.form.checkValidity()) {
      e.target.form.querySelector(".signform__submit").disabled = false;
    } else {
      e.target.form.querySelector(".signform__submit").disabled = true;
    }
  }

  function login(e) {
    e.preventDefault();
    if (e.target.checkValidity()) {
      handleModal(<Preloader />, false);
      auth
        .loginUser(password, email)
        .then((res) => {
          closeModal();
          props.setCurrentUser(true);
          props.onLogin(res.token);
        })
        .catch((e) => {
          console.error(e);
          handleModal(<h2>Ошибка авторизации</h2>, true);
        });
    }
  }

  return (
    <section className='signform'>
      <Link to='/'>
        <img src={logo} className='signform__logo' alt='Логотип' />
      </Link>

      <h1 className='signform__title'>Добро пожаловать</h1>
      <form className='signup__form signform__form' onChange={handleButtonDisabling} onSubmit={login} noValidate>
        <div className='signform__field'>
          <label className='signform__label'>E-mail</label>
          <input
            size='396'
            value={email}
            onChange={(e) => handleInput(e, setEmail)}
            className='signform__input'
            type='email'
            required
            placeholder='Введите почту'
          ></input>
          <div className='signform__info'>Что-то пошло не так...</div>
        </div>
        <div className='signform__field'>
          <label className='signform__label'>Пароль</label>
          <input
            size='396'
            value={password}
            onChange={(e) => handleInput(e, setPassword)}
            className='signform__input'
            type='password'
            minLength='6'
            maxLength='30'
            required
            placeholder='Введите пароль'
          ></input>
          <div className='signform__info'>Что-то пошло не так...</div>
        </div>

        <input className='signup__submit signform__submit' type='submit' disabled={true} value='Войти' />
      </form>
      <Link className='signform__link' to='/signup'>
        Ещё не зарегистрированы? <span className='signform__link-accent'>Регистрация</span>
      </Link>
    </section>
  );
}

export default Login;
