export type Album = {
	title: string
	credits: string
  mbid: string
  duration: int
	albumRelease: string
  score: number | null
  reviewDate: string
  tracks: {
    mbid: string
    trackNumber: number
    trackRank: number | undefined
    trackScore: number | undefined
    duration: number
    name: string
  }[]
}
