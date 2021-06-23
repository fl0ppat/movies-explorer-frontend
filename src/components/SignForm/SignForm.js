import "./SignForm.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
/* eslint-disable react/prop-types */
function SignForm(props) {
  return (
    <section className='signform'>
      <Link to='/'>
        <img src={logo} className='signform__logo' alt='Логотип' />
      </Link>

      <h1 className='signform__title'>{props.title}</h1>
      <form className={props.class + "__form signform__form"}>
        {props.fields.map((field, i) => {
          return (
            <div className='signform__field' key={i}>
              <label className='signform__label'>{field.name}</label>
              <input
                size='396'
                className={field.invalid ? "signform__input signform__input_invalid" : "signform__input"}
                type={field.type}
                required
                placeholder={field.placeholder}
              ></input>
              <div style={field.invalid && { visibility: "visible" }} className='signform__info'>
                Что-то пошло не так...
              </div>
            </div>
          );
        })}
        <input className={props.class + "__submit signform__submit"} type='submit' value={props.submit} />
      </form>
      {props.children}
    </section>
  );
}

export default SignForm;
