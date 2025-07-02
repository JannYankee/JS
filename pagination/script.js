const API_KEY = '123dfcb5';
const API_URL = 'https://www.omdbapi.com/';

let currentPage = 1;

const moviesContainer = document.getElementById('movies-container');
const pageIndicator = document.getElementById('pageIndicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

function fetchMovies(query, page = 1) {
  fetch(`${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie&page=${page}`)
    .then(res => res.json())
    .then(data => {
      moviesContainer.innerHTML = '';
      if (data.Search) {
        const filteredMovies = data.Search.filter(m => m.Poster !== "N/A");

        filteredMovies.forEach(movie => {
          fetch(`${API_URL}?apikey=${API_KEY}&i=${movie.imdbID}`)
            .then(res => res.json())
            .then(fullData => {
              const card = document.createElement('div');
              card.className = 'movie-card';
              card.innerHTML = `
                <img src="${movie.Poster}" />
                <div class="movie-info">
                  <h4>${movie.Title}</h4>
                  <p>${movie.Year}</p>
                  <p><strong>Рейтинг:</strong> ${fullData.imdbRating}</p>
                  <p><strong>Жанри:</strong> ${fullData.Genre}</p>
                </div>
              `;
              card.addEventListener('click', () => {
                localStorage.setItem('selectedMovieId', movie.imdbID);
                window.location.href = 'details.html';
              });
              moviesContainer.appendChild(card);
            });
        });

        pageIndicator.textContent = page;
      } else {
        moviesContainer.innerHTML = `<p>Нічого не знайдено для запиту "${query}"</p>`;
        pageIndicator.textContent = page;
      }
    });
}

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    currentQuery = query;
    currentPage = 1;
    fetchMovies(currentQuery, currentPage);
  }
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchMovies(currentQuery, currentPage);
  }
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  fetchMovies(currentQuery, currentPage);
});

fetchMovies(currentQuery, currentPage);
