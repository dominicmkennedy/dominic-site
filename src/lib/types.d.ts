export type Album = {
	title: string
	credits: string
  mbid: string
  duration: int
	albumRelease: string
  score: number | null
  reviewDate: string | null
  tracks: {
    mbid: string
    trackNumber: number
    trackRank: number | null
    trackScore: number | null
    duration: number
    name: string
  }[]
}
