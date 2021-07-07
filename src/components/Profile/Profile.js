/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import "./Profile.css";
import currentUser from "../../context/userContext";
import { ModalContext } from "../../context/modalContext";

function Profile(props) {
  const user = useContext(currentUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [titleName, setTitleName] = useState("друг");
  let { handleModal } = useContext(ModalContext);

  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const submitButton = document.querySelector(".profile__submit");

  useEffect(() => {
    if (user !== null) {
      setName(user.name);
      setTitleName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  function onFormChange(e) {
    if (
      e.target.form.checkValidity() &&
      nameInput.value.length > 0 &&
      emailInput.value.length > 0 &&
      (nameInput.value !== user.name || emailInput.value !== user.email)
    ) {
      submitButton.style.visibility = "visible";
    } else {
      submitButton.style.visibility = "hidden";
    }
  }

  function changeUserData(e) {
    e.preventDefault();
    if (nameInput.value !== user.name || emailInput.value !== user.email) {
      props
        .onChangeProfile(name, email)
        .then(() => {
          handleModal(<h2 className='modal__title'>Данные обновлены</h2>, true);
        })
        .catch((e) => {
          console.error(e);
          handleModal(<h2 className='modal__title'>Ошибка обновления данных</h2>, true);
        });
    }
  }

  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, {titleName}!</h1>
      <form className='profile__form' onChange={onFormChange} onSubmit={changeUserData}>
        <fieldset className='profile__fieldset'>
          <div className='profile__field'>
            <label className='profile__label' htmlFor='name'>
              Имя
            </label>
            <input
              className='profile__input'
              type='text'
              name='name'
              minLength='3'
              maxLength='30'
              id='name'
              placeholder='Имя'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='profile__field'>
            <label className='profile__label' htmlFor='email'>
              E-mail
            </label>
            <input
              className='profile__input'
              type='email'
              name='email'
              id='email'
              placeholder='Почта'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </fieldset>
        <input className='profile__submit' type='submit' style={{ visibility: "hidden" }} value='Редактировать' />
      </form>
      <button onClick={props.onSignOut} className='profile__signout'>
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
