import type { PageLoad } from './$types';
import { MusicBrainzApi, type IArtistCredit } from 'musicbrainz-api';

const mbApi = new MusicBrainzApi({
  appName: 'dominics personal site',
  appVersion: '0.0.1',
  appContactInfo: 'dominicmkennedy@gmail.com',
  botAccount: {}
});

const getArtists = (y: IArtistCredit[] | undefined) => {
  return y ? y.map(x => `${x.name}${x.joinphrase ? ', ' : ''}`).join('') : ''
}

export const load: PageLoad = async () => {
  // const mbid = "f6f862f0-eae6-4ba1-a27a-352e82f0a6a5"
  const mbid = "09f8b11c-dfaa-4259-842e-0f10c25155fe"
  // const mbid = "f5ffc4db-fdef-4d0d-bf5e-f9f1bc5fef3b"


  const mbidData = await mbApi.lookup('release', mbid, ['recordings', 'artist-credits'])
  const trackList = mbidData.media
    .map(x => x.tracks)
    .flat()
    .map(x => ({
      title: x.recording.title,
      duration: x.recording.length,
      artists: getArtists(x['artist-credit'])
    }))

  const url: string = (
    await (
      await fetch(
        `https://coverartarchive.org/release/${mbid}`
      )
    ).json()
  ).images[0].thumbnails['250'];

  return {
    title: mbidData.title,
    artists: getArtists(mbidData['artist-credit']),
    releaseDate: new Date(mbidData.date),
    trackList,
    totalDuration: trackList.map(x => x.duration).reduce((x, y) => x + y, 0),
    coverArt: url,
    mbid
  };
};



