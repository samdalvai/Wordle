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
  six: number,
  seven: number // only used in Dordle game
}

export const addWinToStatistics = (statistics: GameStatistics): GameStatistics => {
  return { ...statistics, wins: statistics.wins + 1 }
}

export const addLossToStatistics = (statistics: GameStatistics): GameStatistics => {
  return { ...statistics, losses: statistics.losses + 1 }
}

export const initGameStatistics = (): GameStatistics => {
  return { wins: 0, losses: 0, guessDistribution: initGuessDistribution() }
}

export const initGuessDistribution = (): GuessDistribution => {
  return { one: 0, two: 0, three: 0, four: 0, five: 0, six: 0, seven: 0 }
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
    case 7:
      tempDistr['seven'] = tempDistr['seven'] + 1
      break;
    default:
      break;
  }

  return tempDistr
}

export const updateStatisticDistribution = (statistics: GameStatistics, currentGuess: number): GameStatistics => {
  const newGuessDistribution = updateGuessDistribution(statistics, currentGuess)

  return { ...statistics, guessDistribution: newGuessDistribution }
}