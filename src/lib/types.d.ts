export type ReviewParams = {
  mbid: string,
  score: number,
  reviewDate: string,
  tracks: Record<string, { trackRank: number, trackScore: number }>
}
