class Index {
  constructor(id, documentId) {
    if (id <= 0 || documentId <= 0) {
      throw new Error("ID must be positive");
    }
    this.id = id;
    this.documentId = documentId;
    this.index = new Map();
  }

  build(quotes) {
    if (!quotes) throw new Error("Quotes cannot be null");
    this.index.clear();
    for (const quote of quotes) {
      if (!quote || quote.trim() === "") continue;
      const words = quote.toLowerCase().split(/\s+/);
      for (const word of words) {
        if (!this.index.has(word)) this.index.set(word, []);
        this.index.get(word).push(quote);
      }
    }
  }

  search(query) {
    if (!query || query.trim() === "") return [];
    const words = query.toLowerCase().split(/\s+/);
    const result = new Set();
    for (const word of words) {
      const found = this.index.get(word) || [];
      found.forEach(q => result.add(q));
    }
    return [...result];
  }

  getWordCount() {
    return this.index.size;
  }
}

module.exports = Index;
