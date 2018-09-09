let currentId = 0;


export default class FilmService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getUrl({ path = '', params = {} }) {
    let queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    queryString = queryString ? `?${queryString}` : '';

    return this.baseUrl + path + queryString;
  }

  request({ path = '', params = {}, init = {} }) {
    return fetch(this.getUrl({ path, params }), init)
      .then(response => response.json());
  }


  getFilms(page = 0, limit = 10) {
    return this.request({ path: '/films', params: { _page: page, _limit: limit } });
  }

  getFilm(id) {
    return this.request({ path: `/films/${id}` });
  }

  deleteFilm(id) {
    return fetch(`${this.baseUrl}/films/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getId() {
    currentId++;
    return currentId;
  }

  addFilm(filmData) {
    const data = {
      filmData,
      'cover_url': null
    };

    return fetch(`${this.baseUrl}/films/${this.getId()}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  updateFilm(id, data) {

    return fetch(`${this.baseUrl}/films/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
