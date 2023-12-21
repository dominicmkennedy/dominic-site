import type { IArtistCredit } from 'musicbrainz-api';
import { mbApi } from './config';

const getArtists = (y: IArtistCredit[] | undefined) => {
  return y ? y.map(x => `${x.name}${x.joinphrase ? ', ' : ''}`).join('') : ''
}

export const getAlbumData = async (mbid: string) => {
  const mbidData = await mbApi.lookup('release', mbid, ['recordings', 'artist-credits'])
  const url: string = (
    await (
      await fetch(
        `https://coverartarchive.org/release/${mbid}`
      )
    ).json()
  ).images[0].thumbnails['250'];

  const tracks = mbidData.media
    .map(x => x.tracks)
    .flat()
    .map((x,i) => ({
      mbid: x.id,
      albumId: mbid,
      name: x.recording.title,
      credits: getArtists(x['artist-credit']),
      duration: x.recording.length,
      trackNumber: i,
      relAlbumScore: null
    }))

  const album = {
    mbid,
    name: mbidData.title,
    credits: getArtists(mbidData['artist-credit']),
    duration: tracks.map(x => x.duration).reduce((x, y) => x + y, 0),
    numberTracks: tracks.length,
    releaseDate: new Date(mbidData.date),
    coverUrl: url,
    dominicScore: null,
    currentElo: null,
    reviewText: null,
  }

  return { album, tracks };
};


