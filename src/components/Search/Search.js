/* eslint-disable react/prop-types */

import { useState } from "react";
import useWindowSize from "../../utils/useWindowWidth";

import "./Search.css";

function Search(props) {
  const { width } = useWindowSize();
  const [inputValue, setInputValue] = useState("");
  // const [short, setShort] = useState(false)
  const searchDOM = document.querySelector(".search__wrapper");

  function searchSubmit() {
    // e.preventDefault();
    const short = searchDOM.querySelector(".search__toggle");
    props.onSearch({ text: inputValue, short: short.checked });
  }

  return (
    <div className='search__wrapper'>
      <form className='search__line' onSubmit={searchSubmit}>
        <input className='search__input' placeholder='Фильм' required type='text' />
        <input
          className='search__submit'
          onClick={(e) => setInputValue(e.target.value)}
          type='submit'
          value={inputValue}
        />

        {width > 600 && (
          <>
            <span className='search__delimiter'></span>
            <input className='search__toggle' type='checkbox' onClick={searchSubmit} id='checkbox' />
            <label className='search__toggle-label' htmlFor='checkbox'>
              <span className='search__toggle-text'>Короткометражки</span>
            </label>
          </>
        )}
      </form>
      {width <= 600 && (
        <div className='search__toggle-wrapper'>
          <input className='search__toggle' type='checkbox' onClick={searchSubmit} id='checkbox' />
          <label className='search__toggle-label' htmlFor='checkbox'>
            <span className='search__toggle-text'>Короткометражки</span>
          </label>
        </div>
      )}
    </div>
  );
}

export default Search;
