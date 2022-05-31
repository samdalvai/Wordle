import * as compare from '../functions/compare';
import { expect } from 'chai';
import { Color, ColoredLetter } from '../functions/color';

describe('testing compare functions', () => {
    it('should return the word all colored in red', () => {
        const expected: ColoredLetter[] = [
            { letterId: 0, letter: 'A', color: Color.Gray },
            { letterId: 1, letter: 'A', color: Color.Gray },
            { letterId: 2, letter: 'A', color: Color.Gray },
            { letterId: 3, letter: 'A', color: Color.Gray },
            { letterId: 4, letter: 'A', color: Color.Gray }
        ]

        expect(compare.getColoredGuess(['A', 'A', 'A', 'A', 'A'], ['X', 'X', 'X', 'X', 'X'])).to.eql(expected)
    });

    it('should return the word all colored in green', () => {
        const expected: ColoredLetter[] = [
            { letterId: 0, letter: 'A', color: Color.Green },
            { letterId: 1, letter: 'A', color: Color.Green },
            { letterId: 2, letter: 'A', color: Color.Green },
            { letterId: 3, letter: 'A', color: Color.Green },
            { letterId: 4, letter: 'A', color: Color.Green }
        ]

        expect(compare.getColoredGuess(['A', 'A', 'A', 'A', 'A'], ['A', 'A', 'A', 'A', 'A'])).to.eql(expected)
    });

    it('should return the word all colored in yellow', () => {
        const expected: ColoredLetter[] = [
            { letterId: 0, letter: 'A', color: Color.Yellow },
            { letterId: 1, letter: 'B', color: Color.Yellow },
            { letterId: 2, letter: 'C', color: Color.Yellow },
            { letterId: 3, letter: 'D', color: Color.Yellow },
            { letterId: 4, letter: 'E', color: Color.Yellow }
        ]

        expect(compare.getColoredGuess(['A', 'B', 'C', 'D', 'E'], ['B', 'C', 'D', 'E', 'A'])).to.eql(expected)
    });

    it('should color the two A\'s in yellow', () => {
        const expected: ColoredLetter[] = [
            { letterId: 0, letter: 'A', color: Color.Yellow },
            { letterId: 1, letter: 'A', color: Color.Yellow },
            { letterId: 2, letter: 'X', color: Color.Gray },
            { letterId: 3, letter: 'X', color: Color.Gray },
            { letterId: 4, letter: 'X', color: Color.Gray }
        ]

        expect(compare.getColoredGuess(['A', 'A', 'X', 'X', 'X'], ['F', 'F', 'A', 'A', 'A'])).to.eql(expected)
    });

    it('should color one of the two A\'s in green and the other in yellow', () => {
        const expected: ColoredLetter[] = [
            { letterId: 0, letter: 'A', color: Color.Yellow },
            { letterId: 1, letter: 'A', color: Color.Yellow },
            { letterId: 2, letter: 'A', color: Color.Green },
            { letterId: 3, letter: 'X', color: Color.Gray },
            { letterId: 4, letter: 'X', color: Color.Gray }
        ]

        expect(compare.getColoredGuess(['A', 'A', 'A', 'X', 'X'], ['F', 'F', 'A', 'A', 'A'])).to.eql(expected)
    });

    it('should color one of the two A\'s in green and the only one of the others in yellow', () => {
        const expected: ColoredLetter[] = [
            { letterId: 0, letter: 'A', color: Color.Yellow },
            { letterId: 1, letter: 'A', color: Color.Gray },
            { letterId: 2, letter: 'A', color: Color.Green },
            { letterId: 3, letter: 'X', color: Color.Gray },
            { letterId: 4, letter: 'X', color: Color.Gray }
        ]

        expect(compare.getColoredGuess(['A', 'A', 'A', 'X', 'X'], ['F', 'F', 'A', 'A', 'F'])).to.eql(expected)
    });

    it('should color only the leftomost A in yellow', () => {
        const expected: ColoredLetter[] = [
            { letterId: 0, letter: 'A', color: Color.Yellow },
            { letterId: 1, letter: 'A', color: Color.Gray },
            { letterId: 2, letter: 'A', color: Color.Gray },
            { letterId: 3, letter: 'A', color: Color.Gray },
            { letterId: 4, letter: 'X', color: Color.Gray }
        ]

        expect(compare.getColoredGuess(['A', 'A', 'A', 'A', 'X'], ['F', 'F', 'F', 'F', 'A'])).to.eql(expected)
    });

    it('should color color the last a in red and the other letters in yellow', () => {
        const expected: ColoredLetter[] = [
            { letterId: 0, letter: 'A', color: Color.Yellow },
            { letterId: 1, letter: 'X', color: Color.Yellow },
            { letterId: 2, letter: 'A', color: Color.Yellow },
            { letterId: 3, letter: 'X', color: Color.Yellow },
            { letterId: 4, letter: 'A', color: Color.Gray }
        ]

        expect(compare.getColoredGuess(['A', 'X', 'A', 'X', 'A'], ['X', 'A', 'X', 'A', 'X'])).to.eql(expected)
    });

});