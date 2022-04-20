import * as compare from '../src/compare';
import { ColoredLetter } from '../src/wordFormatting'
import { Color } from '../src/colors'
import { expect } from 'chai';

describe('testing compare functions', () => {
    it('should return the word all colored in gray', () => {
        const expected: ColoredLetter[] = [
            { letter: 'A', color: Color.gray },
            { letter: 'A', color: Color.gray },
            { letter: 'A', color: Color.gray },
            { letter: 'A', color: Color.gray },
            { letter: 'A', color: Color.gray }
        ]

        expect(compare.getColoredGuess(['A', 'A', 'A', 'A', 'A'], ['X', 'X', 'X', 'X', 'X'])).to.eql(expected)
    });

    it('should return the word all colored in green', () => {
        const expected: ColoredLetter[] = [
            { letter: 'A', color: Color.green },
            { letter: 'A', color: Color.green },
            { letter: 'A', color: Color.green },
            { letter: 'A', color: Color.green },
            { letter: 'A', color: Color.green }
        ]

        expect(compare.getColoredGuess(['A', 'A', 'A', 'A', 'A'], ['A', 'A', 'A', 'A', 'A'])).to.eql(expected)
    });

    it('should return the word all colored in yellow', () => {
        const expected: ColoredLetter[] = [
            { letter: 'A', color: Color.yellow },
            { letter: 'B', color: Color.yellow },
            { letter: 'C', color: Color.yellow },
            { letter: 'D', color: Color.yellow },
            { letter: 'E', color: Color.yellow }
        ]

        expect(compare.getColoredGuess(['A', 'B', 'C', 'D', 'E'],['B', 'C', 'D', 'E', 'A'])).to.eql(expected)
    });

    it('should color the two A\'s in yellow', () => {
        const expected: ColoredLetter[] = [
            { letter: 'A', color: Color.yellow },
            { letter: 'A', color: Color.yellow },
            { letter: 'X', color: Color.gray },
            { letter: 'X', color: Color.gray },
            { letter: 'X', color: Color.gray }
        ]

        expect(compare.getColoredGuess(['A', 'A', 'X', 'X', 'X'],['F', 'F', 'A', 'A', 'A'])).to.eql(expected)
    });

    it('should color one of the two A\'s in green and the other in yellow', () => {
        const expected: ColoredLetter[] = [
            { letter: 'A', color: Color.yellow },
            { letter: 'A', color: Color.yellow },
            { letter: 'A', color: Color.green },
            { letter: 'X', color: Color.gray },
            { letter: 'X', color: Color.gray }
        ]

        expect(compare.getColoredGuess(['A', 'A', 'A', 'X', 'X'],['F', 'F', 'A', 'A', 'A'])).to.eql(expected)
    });

    it('should color one of the two A\'s in green and the only one of the others in yellow', () => {
        const expected: ColoredLetter[] = [
            { letter: 'A', color: Color.yellow },
            { letter: 'A', color: Color.gray },
            { letter: 'A', color: Color.green },
            { letter: 'X', color: Color.gray },
            { letter: 'X', color: Color.gray }
        ]

        expect(compare.getColoredGuess(['A', 'A', 'A', 'X', 'X'],['F', 'F', 'A', 'A', 'F'])).to.eql(expected)
    });

    it('should color only the leftomost A in yellow', () => {
        const expected: ColoredLetter[] = [
            { letter: 'A', color: Color.yellow },
            { letter: 'A', color: Color.gray },
            { letter: 'A', color: Color.gray },
            { letter: 'A', color: Color.gray },
            { letter: 'X', color: Color.gray }
        ]

        expect(compare.getColoredGuess(['A', 'A', 'A', 'A', 'X'],['F', 'F', 'F', 'F', 'A'])).to.eql(expected)
    });

    it('should color color the last a in gray and the other letters in yellow', () => {
        const expected: ColoredLetter[] = [
            { letter: 'A', color: Color.yellow },
            { letter: 'X', color: Color.yellow },
            { letter: 'A', color: Color.yellow },
            { letter: 'X', color: Color.yellow },
            { letter: 'A', color: Color.gray }
        ]

        expect(compare.getColoredGuess(['A', 'X', 'A', 'X', 'A'],['X', 'A', 'X', 'A', 'X'])).to.eql(expected)
    });

});