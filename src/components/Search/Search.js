import "./Search.css";

function Search() {
  return (
    <div className='search__wrapper'>
      <form className='search__line'>
        <input className='search__input' placeholder='Фильм' type='text' />
        <input className='search__submit' type='submit' value=' ' />
        <span className='search__delimiter'></span>
        <input className='search__toggle' type='checkbox' id='checkbox' />
        <label className='search__toggle-label' htmlFor='checkbox'>
          <span className='search__toggle-text'>Короткометражки</span>
        </label>
      </form>
    </div>
  );
}

export default Search;
