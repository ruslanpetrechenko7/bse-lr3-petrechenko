/**
 * Клас Index — індексація та пошук цитат у документі
 * Проєкт: QuoteFinder AI
 */
class Index {
  /**
   * @param {number} id - Унікальний ідентифікатор індексу
   * @param {number} documentId - Ідентифікатор документу
   * @throws {Error} Якщо id або documentId не є додатнім цілим числом
   */
  constructor(id, documentId) {
    if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0 ||
        typeof documentId !== 'number' || !Number.isInteger(documentId) || documentId <= 0) {
      throw new Error("ID must be positive integer");
    }
    this.id = id;
    this.documentId = documentId;
    this.index = new Map();
  }

  /** @param {string} str @returns {boolean} */
  isBlank(str) {
    return !str || str.trim() === '';
  }

  /**
   * @param {string[]} quotes
   * @throws {Error} Якщо quotes є null
   */
  build(quotes) {
    if (!quotes) throw new Error("Quotes cannot be null");
    this.index.clear();
    for (const quote of quotes) {
      if (this.isBlank(quote)) continue;
      const words = quote.toLowerCase().split(/\s+/);
      for (const word of words) {
        if (!this.index.has(word)) this.index.set(word, []);
        if (!this.index.get(word).includes(quote)) {
          this.index.get(word).push(quote);
        }
      }
    }
  }

  /** @param {string} query @returns {string[]} */
  search(query) {
    if (this.isBlank(query)) return [];
    const words = query.toLowerCase().split(/\s+/);
    const result = new Set();
    for (const word of words) {
      const found = this.index.get(word) || [];
      found.forEach(quote => result.add(quote));
    }
    return [...result];
  }

  /** @returns {number} */
  getWordCount() {
    return this.index.size;
  }
}

module.exports = Index;
