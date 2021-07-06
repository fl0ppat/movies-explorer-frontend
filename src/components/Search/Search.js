/* eslint-disable react/prop-types */

import { useState } from "react";
import useWindowSize from "../../utils/useWindowWidth";

import "./Search.css";

function Search(props) {
  const { width } = useWindowSize();
  const [inputValue, setInputValue] = useState("");
  const searchDOM = document.querySelector(".search__wrapper");

  function searchSubmit(e, update) {
    if (update === undefined) e.preventDefault();
    if (inputValue.length >= 0) {
      const short = searchDOM.querySelector(".search__toggle");
      props.onSearch({ text: inputValue, short: short.checked });
    }
  }

  return (
    <div className='search__wrapper'>
      <form className='search__line' onSubmit={searchSubmit}>
        <input
          className='search__input'
          placeholder='Фильм'
          required
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input className='search__submit' type='submit' value='' />

        {width > 600 && (
          <>
            <span className='search__delimiter'></span>
            <input className='search__toggle' type='checkbox' onClick={(e) => searchSubmit(e, true)} id='checkbox' />
            <label className='search__toggle-label' htmlFor='checkbox'>
              <span className='search__toggle-text'>Короткометражки</span>
            </label>
          </>
        )}
      </form>
      {width <= 600 && (
        <div className='search__toggle-wrapper'>
          <input className='search__toggle' type='checkbox' onClick={(e) => searchSubmit(e, true)} id='checkbox' />
          <label className='search__toggle-label' htmlFor='checkbox'>
            <span className='search__toggle-text'>Короткометражки</span>
          </label>
        </div>
      )}
    </div>
  );
}

export default Search;
