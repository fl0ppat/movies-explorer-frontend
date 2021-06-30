/* eslint-disable react/prop-types */
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import Movie from "../Movie/Movie";
import "./MoviesList.css";

function MoviesList(props, ref) {
  const { movies, cardsOnScreen } = props;
  const [cardsToRender, addCardsToRender] = useState([]);

  useImperativeHandle(ref, () => ({
    cleanAllCards() {
      addCardsToRender([]);
    },
  }));

  function createMoives(filmList) {
    return filmList.map((film) => <Movie mode={props.mode} key={film.id} film={film} />);
  }

  function addCardPack(size) {
    const indexToStart = cardsToRender.length;
    const arrayFragment = createMoives(movies.slice(indexToStart, indexToStart + size));
    addCardsToRender(cardsToRender.concat(arrayFragment));
  }

  useEffect(() => {
    addCardPack(cardsOnScreen.size);
  }, [props.movies]);

  useEffect(() => {
    const cardsInLastRow = cardsToRender.length % cardsOnScreen.load;
    if (cardsToRender.length % cardsOnScreen.load !== 0) {
      addCardPack(cardsOnScreen.load - cardsInLastRow);
    }
  }, [cardsOnScreen]);

  return (
    <>
      <section className='movies-list'>{movies.length === 0 ? null : cardsToRender}</section>
      {movies.length > cardsToRender.length && (
        <button className='movies-list__loadmore' onClick={() => addCardPack(cardsOnScreen.load)}>
          Ещё
        </button>
      )}
    </>
  );
}

export default forwardRef(MoviesList);
