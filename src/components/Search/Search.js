import useWindowSize from "../../utils/useWindowWidth";
import "./Search.css";

function Search() {
  const { width } = useWindowSize();

  return (
    <div className='search__wrapper'>
      <form className='search__line'>
        <input className='search__input' placeholder='Фильм' type='text' />
        <input className='search__submit' type='submit' value=' ' />

        {width > 600 && (
          <>
            <span className='search__delimiter'></span>
            <input className='search__toggle' type='checkbox' id='checkbox' />
            <label className='search__toggle-label' htmlFor='checkbox'>
              <span className='search__toggle-text'>Короткометражки</span>
            </label>
          </>
        )}
      </form>
      {width <= 600 && (
        <div className='search__toggle-wrapper'>
          <input className='search__toggle' type='checkbox' id='checkbox' />
          <label className='search__toggle-label' htmlFor='checkbox'>
            <span className='search__toggle-text'>Короткометражки</span>
          </label>
        </div>
      )}
    </div>
  );
}

export default Search;
