import { expect } from 'chai';
import { Color, getStrongestColor, initColoredArrayOfLetters } from '../functions/color';

describe('testing color functions', () => {
    it('green should be stronger than yellow', () => {
        expect(getStrongestColor(Color.Green, Color.Yellow)).equal(Color.Green)
    });

    it('green should be stronger than gray', () => {
        expect(getStrongestColor(Color.Green, Color.Gray)).equal(Color.Green)
    });

    it('green should be stronger than none', () => {
        expect(getStrongestColor(Color.Green, Color.None)).equal(Color.Green)
    });

    it('yellow should be stronger than gray', () => {
        expect(getStrongestColor(Color.Yellow, Color.Gray)).equal(Color.Yellow)
    });

    it('yellow should be stronger than none', () => {
        expect(getStrongestColor(Color.Yellow, Color.None)).equal(Color.Yellow)
    });

    it('yellow should be weaker than green', () => {
        expect(getStrongestColor(Color.Yellow, Color.Green)).equal(Color.Green)
    });

    it('gray should be stronger than none', () => {
        expect(getStrongestColor(Color.Gray, Color.None)).equal(Color.Gray)
    });

    it('gray should be weaker than yellow', () => {
        expect(getStrongestColor(Color.Gray, Color.Yellow)).equal(Color.Yellow)
    });

    it('gray should be weaker than green', () => {
        expect(getStrongestColor(Color.Gray, Color.Green)).equal(Color.Green)
    });

});

describe('testing init color functions', () => {
    it('should initialize an array of colored letters with color equal to none', () => {
        const coloredWord = initColoredArrayOfLetters(['T', 'E', 'S', 'T']);
        const expected = [{ letterId: 0, letter: 'T', color: Color.None },
        { letterId: 1, letter: 'E', color: Color.None },
        { letterId: 2, letter: 'S', color: Color.None },
        { letterId: 3, letter: 'T', color: Color.None }]

        expect(coloredWord).to.eql(expected)
    });


});