import Model from '../model'

const Books = {
  ...Model,
  key: 'books',
  permittedAttrs: ['title', 'content', 'authorId', 'categoryId'],

  search(categoryId, query) {
    const books = categoryId ? this.where({ categoryId }) : this.collection()

    return books.filter(({ title }) => title.match(new RegExp(query, 'i')))
  }
}

export default Books
