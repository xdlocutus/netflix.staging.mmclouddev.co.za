# TMDB + AIOStreams content service

This implementation wires content discovery to TMDB and playback links to AIOStreams:

- `GET /api/content` returns trending **movies** and **shows** from TMDB.
- `GET /api/movie/streams?tmdbId=...` returns movie stream links from AIOStreams.
- `GET /api/show/episode/streams?tmdbId=...&season=...&episode=...` validates the episode in TMDB, then returns episode links from AIOStreams.

## Setup

1. Copy `.env.example` to `.env` and set real API credentials.
2. Start with:

```bash
npm start
```

## Notes

- The default AIOStreams URL is a placeholder (`https://api.aiostreams.example`).
- Update request paths in `src/aioStreamsClient.js` if your AIOStreams deployment uses different endpoints.
