import * as input from '../src/input';
import { expect } from 'chai';

describe('testing input functions', () => {
  it('number string should be number', () => {
    expect(input.isNumber("123")).equal(true)
  });

  it('non number string should not be number', () => {
    expect(input.isNumber("1a23")).equal(false)
  });

  it('word string should be word', () => {
    expect(input.isWord("hello")).equal(true)
  });

  it('non word string should not be word', () => {
    expect(input.isWord("hell1lo")).equal(false)
  });
});