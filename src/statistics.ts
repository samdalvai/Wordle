/**********************************************/
//  GAME STATISTICS
/**********************************************/

export type GameStatistics = {
  wins: number,
  losses: number,
  guessDistribution: GuessDistribution
}

export type GuessDistribution = {
  one: number,
  two: number,
  three: number,
  four: number,
  five: number,
  six: number
}

export const initGuessDistribution = (): GuessDistribution => {
  return { one: 0, two: 0, three: 0, four: 0, five: 0, six: 0 }
}

export const updateGuessDistribution = (statistics: GameStatistics, currentGuess: number): GuessDistribution => {

  let tempDistr = { ...statistics.guessDistribution }

  switch (currentGuess) {
    case 1:
      tempDistr['one'] = tempDistr['one'] + 1
      break;
    case 2:
      tempDistr['two'] = tempDistr['two'] + 1
      break;
    case 3:
      tempDistr['three'] = tempDistr['three'] + 1
      break;
    case 4:
      tempDistr['four'] = tempDistr['four'] + 1
      break;
    case 5:
      tempDistr['five'] = tempDistr['five'] + 1
      break;
    case 6:
      tempDistr['six'] = tempDistr['six'] + 1
      break;
    default:
      break;
  }

  return tempDistr
}