import Policy from '../policy'

const BooksPolicy = {
  ...Policy,

  create(user) {
    return !!user
  },

  update(user, book) {
    return user && user.id === book.authorId
  },

  destroy(user, book) {
    return user && (user.isAdmin || user.id === book.authorId)
  }
}

export default BooksPolicy
