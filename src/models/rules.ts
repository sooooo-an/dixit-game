export const GAME_RULES: { id: keyof Rules; text: string; maxPoint?: number }[] = [
  {
    id: 'fullPoints',
    text: '모든 플레이어가 맞추거나 틀렸을 때의 포인트:',
    maxPoint: 10,
  },
  {
    id: 'partialPoints',
    text: '일부 플레이어만 맞췄을 떄의 포인트:',
    maxPoint: 10,
  },
  {
    id: 'bonusPerVote',
    text: '투표 당한 사람의 포인트:',
    maxPoint: 10,
  },
  {
    id: 'winScore',
    text: '승리 포인트:',
    maxPoint: 50,
  },
] as const

export const initializeRule: Rules = {
  partialPoints: 3,
  fullPoints: 2,
  bonusPerVote: 1,
  winScore: 30,
}

export type Rules = {
  partialPoints: number
  fullPoints: number
  bonusPerVote: number
  winScore: number
}
