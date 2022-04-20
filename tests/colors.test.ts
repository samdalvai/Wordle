import * as color from '../src/colors';
import { Color } from '../src/colors';
import { expect } from 'chai';

describe('testing color functions', () => {
    it('green should be stronger than yellow', () => {
        expect(color.getStrongestColor(Color.green, Color.yellow)).equal(Color.green)
    });

    it('green should be stronger than gray', () => {
        expect(color.getStrongestColor(Color.green, Color.gray)).equal(Color.green)
    });

    it('green should be stronger than none', () => {
        expect(color.getStrongestColor(Color.green, Color.none)).equal(Color.green)
    });

    it('yellow should be stronger than gray', () => {
        expect(color.getStrongestColor(Color.yellow, Color.gray)).equal(Color.yellow)
    });

    it('yellow should be stronger than none', () => {
        expect(color.getStrongestColor(Color.yellow, Color.none)).equal(Color.yellow)
    });

    it('yellow should be weaker than green', () => {
        expect(color.getStrongestColor(Color.yellow, Color.green)).equal(Color.green)
    });

    it('gray should be stronger than none', () => {
        expect(color.getStrongestColor(Color.gray, Color.none)).equal(Color.gray)
    });

    it('gray should be weaker than yellow', () => {
        expect(color.getStrongestColor(Color.gray, Color.yellow)).equal(Color.yellow)
    });

    it('gray should be weaker than green', () => {
        expect(color.getStrongestColor(Color.gray, Color.green)).equal(Color.green)
    });

});