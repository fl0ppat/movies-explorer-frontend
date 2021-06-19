import "./Profile.css";

function Profile() {
  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <form className='profile__form'>
        <fieldset className='profile__fieldset'>
          <div className='profile__field'>
            <label className='profile__label' htmlFor='name'>
              Имя
            </label>
            <input className='profile__input' type='text' name='name' id='name' placeholder='Имя' value='Леголас' />
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
              value='legolas@mirkwood.com'
            />
          </div>
        </fieldset>
        <input className='profile__submit' type='submit' value='Редактировать' />
      </form>
      <button className='profile__signout'>Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;
