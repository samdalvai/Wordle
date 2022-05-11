import { expect } from "chai";
import { Color, ColoredLetter } from "../functions/color";
import { validGuessInHardMode } from "../functions/hardMode";

describe("testing hardmode functions", () => {

    it("should accept the previous yellow letter at another position", () => {
        const previousWord = [
            { letterId: 0, letter: 'A', color: Color.Yellow },
            { letterId: 1, letter: 'X', color: Color.Gray },
            { letterId: 2, letter: 'X', color: Color.Gray },
            { letterId: 3, letter: 'X', color: Color.Gray },
            { letterId: 4, letter: 'X', color: Color.Gray }
        ]

        expect(validGuessInHardMode(previousWord,"XXXXA")).equal(true);
    });

    it("should accept the previous two yellow letters at another position", () => {
        const previousWord = [
            { letterId: 0, letter: 'A', color: Color.Yellow },
            { letterId: 1, letter: 'X', color: Color.Gray },
            { letterId: 2, letter: 'A', color: Color.Yellow },
            { letterId: 3, letter: 'X', color: Color.Gray },
            { letterId: 4, letter: 'X', color: Color.Gray }
        ]

        expect(validGuessInHardMode(previousWord,"XAXXA")).equal(true);
    });

    it("should not accept a word without the previous yellow letter", () => {
        const previousWord = [
            { letterId: 0, letter: 'A', color: Color.Yellow },
            { letterId: 1, letter: 'X', color: Color.Gray },
            { letterId: 2, letter: 'X', color: Color.Gray },
            { letterId: 3, letter: 'X', color: Color.Gray },
            { letterId: 4, letter: 'X', color: Color.Gray }
        ]

        expect(validGuessInHardMode(previousWord,"XXXXB")).equal(false);
    });

    it("should not accept less yellow letters than the previous word", () => {
        const previousWord = [
            { letterId: 0, letter: 'A', color: Color.Yellow },
            { letterId: 1, letter: 'X', color: Color.Gray },
            { letterId: 2, letter: 'A', color: Color.Yellow },
            { letterId: 3, letter: 'X', color: Color.Gray },
            { letterId: 4, letter: 'X', color: Color.Gray }
        ]

        expect(validGuessInHardMode(previousWord,"XXXXA")).equal(false);
    });

    it("should accept a green letters in the same position as in the previous word", () => {
        const previousWord = [
            { letterId: 0, letter: 'A', color: Color.Gray },
            { letterId: 1, letter: 'X', color: Color.Gray },
            { letterId: 2, letter: 'A', color: Color.Green },
            { letterId: 3, letter: 'X', color: Color.Gray },
            { letterId: 4, letter: 'X', color: Color.Gray }
        ]

        expect(validGuessInHardMode(previousWord,"XXAXX")).equal(true);
    });

    it("should not accept the letter in another position, if in the previous word it was green", () => {
        const previousWord = [
            { letterId: 0, letter: 'A', color: Color.Gray },
            { letterId: 1, letter: 'X', color: Color.Gray },
            { letterId: 2, letter: 'A', color: Color.Green },
            { letterId: 3, letter: 'X', color: Color.Gray },
            { letterId: 4, letter: 'X', color: Color.Gray }
        ]

        expect(validGuessInHardMode(previousWord,"XAXXX")).equal(false);
    });

    it("should accept arbitraRy letters, if in the previous word all the letters were gray", () => {
        const previousWord = [
            { letterId: 0, letter: 'A', color: Color.Gray },
            { letterId: 1, letter: 'B', color: Color.Gray },
            { letterId: 2, letter: 'C', color: Color.Gray },
            { letterId: 3, letter: 'D', color: Color.Gray },
            { letterId: 4, letter: 'E', color: Color.Gray }
        ]

        expect(validGuessInHardMode(previousWord,"FGHIJ")).equal(true);
    });
});
