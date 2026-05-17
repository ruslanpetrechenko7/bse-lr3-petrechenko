const Index = require('./Index');
describe('Index', () => {
  let index;
  beforeEach(() => {
    index = new Index(1, 1);
    index.build(["The quick brown fox","The fox jumped over","A lazy dog rested"]);
  });
  test('TC01 search valid query', () => { expect(index.search("fox")).toHaveLength(2); });
  test('TC02 search null', () => { expect(index.search(null)).toEqual([]); });
  test('TC03 search empty', () => { expect(index.search("")).toEqual([]); });
  test('TC04 search blank', () => { expect(index.search("   ")).toEqual([]); });
  test('TC05 search unknown', () => { expect(index.search("python")).toEqual([]); });
  test('TC06 search multiple words', () => { expect(index.search("fox dog")).toHaveLength(3); });
  test('TC07 case insensitive', () => { expect(index.search("FOX")).toHaveLength(2); });
  test('TC08 build null throws', () => { expect(() => index.build(null)).toThrow(); });
  test('TC09 build empty array', () => { index.build([]); expect(index.getWordCount()).toBe(0); });
  test('TC10 build single quote', () => { index.build(["hello world"]); expect(index.getWordCount()).toBe(2); });
  test('TC11 negative id throws', () => { expect(() => new Index(-1, 1)).toThrow(); });
  test('TC12 zero id throws', () => { expect(() => new Index(0, 1)).toThrow(); });
  test('TC13 skip invalid strings', () => { index.build(["valid", null, "", "  "]); expect(index.getWordCount()).toBeGreaterThan(0); });
});
