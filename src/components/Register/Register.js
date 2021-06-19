import { Link } from "react-router-dom";
import SignForm from "../SignForm/SignForm";

function Register() {
  return (
    <SignForm
      class='signup'
      title='Добро пожаловать'
      submit='Зарегистрироваться'
      fields={[
        { name: "Имя", placeholder: "Введите имя", type: "text", invalid: true },
        { name: "E-mail", placeholder: "Введите ", type: "email" },
        { name: "Пароль", placeholder: "Введи", type: "password" },
      ]}
    >
      <Link className='signform__link' to='/signin'>
        Уже зарегистрированы? <span className='signform__link-accent'>Войти</span>
      </Link>
    </SignForm>
  );
}

export default Register;
