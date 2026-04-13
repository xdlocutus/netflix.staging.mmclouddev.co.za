const DEFAULT_AIOSTREAMS_BASE_URL = 'https://api.aiostreams.example';

function assertAioConfig(aioStreamsBaseUrl, aioStreamsApiKey) {
  if (!aioStreamsApiKey) {
    throw new Error('AIOSTREAMS_API_KEY is required.');
  }

  if (!aioStreamsBaseUrl) {
    throw new Error('AIOSTREAMS_BASE_URL is required.');
  }
}

async function aiostreamsRequest(path, aioStreamsBaseUrl, aioStreamsApiKey, body) {
  assertAioConfig(aioStreamsBaseUrl, aioStreamsApiKey);

  const response = await fetch(`${aioStreamsBaseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${aioStreamsApiKey}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`AIOStreams request failed (${response.status}): ${text}`);
  }

  return response.json();
}

export async function getMovieStreams({ tmdbId, title, year, aioStreamsBaseUrl = DEFAULT_AIOSTREAMS_BASE_URL, aioStreamsApiKey }) {
  return aiostreamsRequest('/v1/streams/movie', aioStreamsBaseUrl, aioStreamsApiKey, {
    provider: 'tmdb',
    tmdbId,
    title,
    year
  });
}

export async function getEpisodeStreams({ tmdbId, season, episode, title, aioStreamsBaseUrl = DEFAULT_AIOSTREAMS_BASE_URL, aioStreamsApiKey }) {
  return aiostreamsRequest('/v1/streams/episode', aioStreamsBaseUrl, aioStreamsApiKey, {
    provider: 'tmdb',
    tmdbId,
    season,
    episode,
    title
  });
}
