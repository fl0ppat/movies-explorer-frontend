import consts from "./constants";

const { filmAPI } = consts;

class Api {
  constructor(url) {
    this._baseURL = url;
  }

  /**
   *
   *
   * @param {Object} movie
   * @return {*}
   * @memberof Api
   */
  likeFilm(movie) {
    const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } =
      movie;
    return this._sendRequest(
      "POST",
      `${this._baseURL}/movies`,
      { "Content-Type": "application/json" },
      { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId }
    ).then((res) => this._handleResponseStatus(res));
  }

  deleteFilm(id) {
    return this._sendRequest("DELETE", `${this._baseURL}/movies/${id}`, { "Content-Type": "application/json" }).then(
      (res) => this._handleResponseStatus(res)
    );
  }

  _handleResponseStatus(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _objectIsEmptyOrUndefined(obj) {
    if (obj === "undefined") {
      return true;
    }
    return obj && Object.keys(obj).length === 0;
  }

  /**
   * Send modulable request
   *
   * @param {string} method Sending method (GET, POST, etc.)
   * @param {string} url API URL
   * @param {object} headers key: value representation of headers
   * @param {object} body key: vlaue representation of body
   * @return {Promise}
   * @memberof Api
   */
  _sendRequest(method, url, headers, body) {
    const reqHeader = {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };

    if (headers && !this._objectIsEmptyOrUndefined(headers)) {
      Object.assign(reqHeader, headers);
    }

    const fetchData = {
      method,
      headers: reqHeader,
      credentials: "include",
    };

    if (body && !this._objectIsEmptyOrUndefined(body)) {
      fetchData.body = JSON.stringify(body);
    }
    return fetch(url, fetchData);
  }
}
const api = new Api(filmAPI);
export default api;
