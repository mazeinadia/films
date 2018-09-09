export default class FilmService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

    getUrl({path = '', params = {}}) {
        let queryString = Object.keys(params)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
            .join('&');

        queryString = queryString ? '?' + queryString : '';

        return this.baseUrl + path + queryString;
    }

    request({path = '', params = {}, init = {}}) {
        return fetch(this.getUrl({path: path, params: params}), init)
            .then(response => response.json());
    }



  getFilms(page = 0, limit = 10) {
    return this.request({ path: '/films', params: { _page: page, _limit: limit } });
  }

  getFilm(id) {
    return this.request({ path: `/films/${id}` });
  }

  deleteFilm(id) {
    // POST
      return true;
  }

  addFilm(data) {
      // POST
      return true;
  }

  updateFilm(id, data) {
      return this.deleteFilm(id).then(() => this.addFilm(data));
  }
}
