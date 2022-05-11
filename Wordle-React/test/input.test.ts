import { expect } from 'chai';
import { WordsData } from '../functions/game';
import { isNumber, isValidIndexOfWord } from '../functions/input';

describe('testing input functions', () => {
  it('number string should be number', () => {
    expect(isNumber("123")).equal(true)
  });

  it('non number string should not be number', () => {
    expect(isNumber("1a23")).equal(false)
  });

  let words: WordsData;

  beforeEach(() => {
    words = { answers: ['a', 'b', 'c'], words: ['a', 'b', 'c'] }
  })

  it('should accept index of word at the beginning', () => {
    expect(isValidIndexOfWord('0', words)).equal(true)
  })

  it('should accept index of word at the end', () => {
    expect(isValidIndexOfWord('2', words)).equal(true)
  })

  it('should not accept negative index of word', () => {
    expect(isValidIndexOfWord('-1', words)).equal(false)
  })

  it('should not accept index of word above maximum number', () => {
    expect(isValidIndexOfWord('3', words)).equal(false)
  })

  it('should not accept index of word as double number', () => {
    expect(isValidIndexOfWord('3.333', words)).equal(false)
  })

  it('should not accept index of word as words', () => {
    expect(isValidIndexOfWord('test', words)).equal(false)
  })

});