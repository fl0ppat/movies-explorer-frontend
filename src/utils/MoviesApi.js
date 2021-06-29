import consts from "./constants";

const { beatfilmAPI } = consts;

const fetchAllFilms = () =>
  fetch(beatfilmAPI).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Something went wrong on api server!");
    }
  });

export default fetchAllFilms;
