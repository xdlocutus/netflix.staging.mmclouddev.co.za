import http from 'node:http';
import { URL } from 'node:url';
import { getEpisodePlaybackLinks, getHomeContent, getMoviePlaybackLinks } from './contentService.js';

const PORT = Number(process.env.PORT || 3000);
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const AIOSTREAMS_API_KEY = process.env.AIOSTREAMS_API_KEY;
const AIOSTREAMS_BASE_URL = process.env.AIOSTREAMS_BASE_URL || 'https://api.aiostreams.example';

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url || '/', `http://${req.headers.host}`);

    if (req.method === 'GET' && requestUrl.pathname === '/api/content') {
      const page = Number(requestUrl.searchParams.get('page') || 1);
      const content = await getHomeContent(TMDB_API_KEY, page);
      return sendJson(res, 200, content);
    }

    if (req.method === 'GET' && requestUrl.pathname === '/api/movie/streams') {
      const tmdbId = Number(requestUrl.searchParams.get('tmdbId'));
      const title = requestUrl.searchParams.get('title') || '';
      const year = Number(requestUrl.searchParams.get('year')) || undefined;

      const links = await getMoviePlaybackLinks({
        tmdbApiKey: TMDB_API_KEY,
        aioStreamsApiKey: AIOSTREAMS_API_KEY,
        aioStreamsBaseUrl: AIOSTREAMS_BASE_URL,
        tmdbId,
        title,
        year
      });

      return sendJson(res, 200, links);
    }

    if (req.method === 'GET' && requestUrl.pathname === '/api/show/episode/streams') {
      const tmdbId = Number(requestUrl.searchParams.get('tmdbId'));
      const season = Number(requestUrl.searchParams.get('season'));
      const episode = Number(requestUrl.searchParams.get('episode'));
      const showTitle = requestUrl.searchParams.get('title') || '';

      const links = await getEpisodePlaybackLinks({
        tmdbApiKey: TMDB_API_KEY,
        aioStreamsApiKey: AIOSTREAMS_API_KEY,
        aioStreamsBaseUrl: AIOSTREAMS_BASE_URL,
        tmdbId,
        season,
        episode,
        showTitle
      });

      return sendJson(res, 200, links);
    }

    return sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    return sendJson(res, 500, { error: error.message });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on :${PORT}`);
});
