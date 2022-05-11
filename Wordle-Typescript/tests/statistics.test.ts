import { GuessDistribution, GameStatistics, initGuessDistribution, updateGuessDistribution } from "../src/statistics";
import { expect } from "chai";

describe("testing statistics update", () => {
    let mockstats: GameStatistics;

    beforeEach(() => {
        mockstats = {
            wins: 0,
            losses: 0,
            guessDistribution: initGuessDistribution(),
        };
    });

    it("should update guess distribution for one", () => {
        const updatedDist: GuessDistribution = updateGuessDistribution(mockstats, 1);

        expect(updatedDist.one).equal(1);
    });

    it("should update guess distribution for two", () => {
        const updatedDist: GuessDistribution = updateGuessDistribution(mockstats, 2);

        expect(updatedDist.two).equal(1);
    });

    it("should update guess distribution for three", () => {
        const updatedDist: GuessDistribution = updateGuessDistribution(mockstats, 3);

        expect(updatedDist.three).equal(1);
    });

    it("should update guess distribution for four", () => {
        const updatedDist: GuessDistribution = updateGuessDistribution(mockstats, 4);

        expect(updatedDist.four).equal(1);
    });

    it("should update guess distribution for five", () => {
        const updatedDist: GuessDistribution = updateGuessDistribution(mockstats, 5);

        expect(updatedDist.five).equal(1);
    });

    it("should update guess distribution for six", () => {
        const updatedDist: GuessDistribution = updateGuessDistribution(mockstats, 6);

        expect(updatedDist.six).equal(1);
    });
});
