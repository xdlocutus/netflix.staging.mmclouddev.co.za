import { getEpisodeStreams, getMovieStreams } from './aioStreamsClient.js';
import { getShowEpisode, getTrendingMovies, getTrendingShows } from './tmdbClient.js';

export async function getHomeContent(tmdbApiKey, page = 1) {
  const [movies, shows] = await Promise.all([
    getTrendingMovies(tmdbApiKey, page),
    getTrendingShows(tmdbApiKey, page)
  ]);

  return { movies, shows };
}

export async function getMoviePlaybackLinks({ tmdbApiKey, aioStreamsApiKey, aioStreamsBaseUrl, tmdbId, title, year }) {
  return getMovieStreams({
    tmdbId,
    title,
    year,
    aioStreamsApiKey,
    aioStreamsBaseUrl
  });
}

export async function getEpisodePlaybackLinks({ tmdbApiKey, aioStreamsApiKey, aioStreamsBaseUrl, tmdbId, season, episode, showTitle }) {
  await getShowEpisode(tmdbApiKey, tmdbId, season, episode);

  return getEpisodeStreams({
    tmdbId,
    season,
    episode,
    title: showTitle,
    aioStreamsApiKey,
    aioStreamsBaseUrl
  });
}
