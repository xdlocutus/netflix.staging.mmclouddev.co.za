const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function assertTmdbApiKey(apiKey) {
  if (!apiKey) {
    throw new Error('TMDB_API_KEY is required.');
  }
}

async function tmdbRequest(path, tmdbApiKey, searchParams = {}) {
  assertTmdbApiKey(tmdbApiKey);

  const url = new URL(`${TMDB_BASE_URL}${path}`);
  url.searchParams.set('api_key', tmdbApiKey);

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`TMDB request failed (${response.status}): ${text}`);
  }

  return response.json();
}

function normalizeMovie(movie) {
  return {
    id: movie.id,
    tmdbId: movie.id,
    type: 'movie',
    title: movie.title,
    overview: movie.overview,
    releaseDate: movie.release_date,
    poster: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null,
    backdrop: movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}` : null,
    rating: movie.vote_average
  };
}

function normalizeShow(show) {
  return {
    id: show.id,
    tmdbId: show.id,
    type: 'show',
    title: show.name,
    overview: show.overview,
    releaseDate: show.first_air_date,
    poster: show.poster_path ? `${TMDB_IMAGE_BASE_URL}${show.poster_path}` : null,
    backdrop: show.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${show.backdrop_path}` : null,
    rating: show.vote_average
  };
}

export async function getTrendingMovies(tmdbApiKey, page = 1) {
  const payload = await tmdbRequest('/trending/movie/week', tmdbApiKey, { page });
  return (payload.results ?? []).map(normalizeMovie);
}

export async function getTrendingShows(tmdbApiKey, page = 1) {
  const payload = await tmdbRequest('/trending/tv/week', tmdbApiKey, { page });
  return (payload.results ?? []).map(normalizeShow);
}

export async function getShowEpisode(tmdbApiKey, showId, seasonNumber, episodeNumber) {
  return tmdbRequest(
    `/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}`,
    tmdbApiKey
  );
}
