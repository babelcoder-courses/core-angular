import Serializer from '../serializer'
import { Books } from '../books'

const UsersSerializer = {
  ...Serializer,

  get(user) {
    return this.serialize(user)
  },

  getAll(users) {
    return users
      .map(user => ({
        ...this.serialize(user),
        books: Books.where({ authorId: user.id })
      }))
  },

  create(user) {
    return this.serialize(user)
  },

  serialize(user) {
    const { id, email, isAdmin } = user

    return { id, email, isAdmin }
  }
}

export default UsersSerializer
