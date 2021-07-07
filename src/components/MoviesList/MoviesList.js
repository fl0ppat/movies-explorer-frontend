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
    return filmList.map((film) => (
      <Movie
        mode={props.deleteMode}
        onLike={props.onLike}
        onDislike={props.onDislike}
        key={film.movieId}
        film={film}
        likedId={props}
      />
    ));
  }

  function addCardPack(size) {
    const indexToStart = cardsToRender.length;
    const arrayFragment = createMoives(movies.slice(indexToStart, indexToStart + size));
    addCardsToRender(cardsToRender.concat(arrayFragment));
  }

  useEffect(() => {
    if (props.deleteMode) {
      addCardPack(movies.length);
    } else {
      addCardPack(cardsOnScreen.size);
    }
  }, [props.movies]);

  useEffect(() => {
    const cardsInLastRow = cardsToRender.length % cardsOnScreen.load;
    if (cardsToRender.length % cardsOnScreen.load !== 0) {
      addCardPack(cardsOnScreen.load - cardsInLastRow);
    }
  }, [cardsOnScreen]);

  function handleNotFound(filmList) {
    return filmList.length > 0 ? filmList : <h2 className='movies-list__notfound'>Ничего не найдено</h2>;
  }

  return (
    <>
      <section className='movies-list'>{handleNotFound(cardsToRender)}</section>
      {cardsToRender.length > 0 && movies.length > cardsToRender.length && (
        <button className='movies-list__loadmore' onClick={() => addCardPack(cardsOnScreen.load)}>
          Ещё
        </button>
      )}
    </>
  );
}

export default forwardRef(MoviesList);
