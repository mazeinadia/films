export default class FilmService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getFilms(page = 0, limit = 10) {
    return fetch(`${this.baseUrl}/films?_sort=id&_order=desc&_page=${page}&_limit=${limit}`)
      .then(response => response.json());
  }

  getFilm(id) {
    return fetch(`${this.baseUrl}/films/${id}`).then(response => response.json());
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
    return fetch(`${this.baseUrl}/films?_sort=id&_order=desc&_limit=1`)
      .then(response => response.json())
      .then(body => body[0].id);
  }

  addFilm(filmData) {
    return this.getId().then(id => id + 1)
      .then(nextId => ({
        title: filmData.title,
        rating: filmData.rating,
        description: filmData.description,
        cover_url: null,
        id: nextId,
      }))
      .then(data => fetch(`${this.baseUrl}/films`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }));
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
