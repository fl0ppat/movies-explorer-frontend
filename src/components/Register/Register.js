/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "../SignForm/SignForm.css";
import handleInput from "../../utils/validator";
import { ModalContext } from "../../context/modalContext";
import Preloader from "../Preloader/Preloader";

import auth from "../../utils/AuthApi";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let { handleModal, closeModal } = useContext(ModalContext);
  //const history = useHistory();

  function handleButtonDisabling(e) {
    if (name.length > 0 && email.length > 0 && password.length > 0 && e.target.form.checkValidity()) {
      e.target.form.querySelector(".signform__submit").disabled = false;
    } else {
      e.target.form.querySelector(".signform__submit").disabled = true;
    }
  }

  function register(e) {
    e.preventDefault();
    handleModal(<Preloader />, false);
    if (e.target.checkValidity()) {
      auth
        .registerUser(password, email, name)
        .then(() => {
          auth.loginUser(password, email).then((res) => {
            closeModal();
            props.setCurrentUser(true);
            props.onLogin(res.token);
          });
        })
        .catch((e) => {
          console.error(e);
          handleModal(<h2 className='modal__title'>Ошибка регистрации</h2>, true);
        });
    }
  }

  return (
    <section className='signform'>
      <Link to='/'>
        <img src={logo} className='signform__logo' alt='Логотип' />
      </Link>

      <h1 className='signform__title'>Добро пожаловать</h1>
      <form className='signup__form signform__form' onChange={handleButtonDisabling} onSubmit={register} noValidate>
        <div className='signform__field'>
          <label className='signform__label'>Имя</label>
          <input
            size='396'
            value={name}
            onChange={(e) => handleInput(e, setName)}
            className='signform__input'
            type='text'
            minLength='3'
            maxLength='30'
            required
            placeholder='Введите имя'
            id='name'
          ></input>
          <div className='signform__info'>Заполните это поле.</div>
        </div>
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
            id='email'
          ></input>
          <div className='signform__info'>Заполните это поле.</div>
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
            id='password'
          ></input>
          <div className='signform__info'>Заполните это поле.</div>
        </div>

        <input className='signup__submit signform__submit' type='submit' disabled={true} value='Регистрация' />
      </form>
      <Link className='signform__link' to='/signin'>
        Уже зарегистрированы? <span className='signform__link-accent'>Войти</span>
      </Link>
    </section>
  );
}

export default Register;
