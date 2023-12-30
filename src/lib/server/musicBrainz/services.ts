import type { IArtistCredit } from 'musicbrainz-api';
import { mbApi } from './config';
import type { Album, Track } from '@prisma/client';
import { std, mean, sum } from 'mathjs';

const getArtists = (y: IArtistCredit[] | undefined) => {
  return y ? y.map(x => `${x.name}${x.joinphrase ? ', ' : ''}`).join('') : ''
}

export const getAlbumData = async (mbid: string) => {
  const mbidData = await mbApi.lookup('release', mbid, ['recordings', 'artist-credits'])

  const trackDurations = mbidData.media
    .map(x => x.tracks)
    .flat()
    .map(x => x.recording.length)

  const trackLenMean = mean(trackDurations)
  const trackLenStd: number = std(trackDurations)

  const tracks: Track[] = mbidData.media
    .map(x => x.tracks)
    .flat()
    .map((x, i) => ({
      mbid: x.id,
      albumId: mbid,
      name: x.recording.title,
      credits: getArtists(x['artist-credit']),
      duration: x.recording.length,
      trackNumber: i,
      zScore: (x.recording.length - trackLenMean) / trackLenStd,
      relAlbumScore: null
    }))

  const album: Album = {
    mbid,
    name: mbidData.title,
    credits: getArtists(mbidData['artist-credit']),
    duration: sum(trackDurations),
    trackLenMean,
    trackLenStd,
    releaseDate: new Date(mbidData.date),
    coverArtUrl: `https://coverartarchive.org/release/${mbid}/front-250`,
    dominicScore: null,
    currentElo: null,
    reviewDate: null,
  }

  return { album, tracks };
};
