import Books from './model'
import BooksPolicy from './policy'

const BooksController = {
  search(req, res) {
    const { categoryId, query } = req.query
    const books = Books.search(categoryId, query)

    res.json({ books })
  },

  getAll(req, res) {
    const { categoryId, page, perPage } = req.query
    const books =
      Books.paginate(categoryId ? { categoryId } : {}, page, perPage)

    res.json(books)
  },

  get(req, res) {
    res.json({ book: Books.find(req.params.id) })
  },

  create(req, res) {
    const user = req.user

    if(BooksPolicy.for('create', user)) {
      const book = Books.create({ ...req.body, authorId: user.id })

      res.status(201).json({ book })
    } else {
      res
        .status(401)
        .json({
          book: {
            errors: ['You are not allowed to create the book.']
          }
        })
    }
  },

  update(req, res) {
    const id = req.params.id

    if(BooksPolicy.for('update', req.user, Books.find(id))) {
      const book = Books.update(id, req.body)

      res.status(200).json({ book })
    } else {
      res
        .status(401)
        .json({
          book: {
            errors: ['You are not allowed to update the book.']
          }
        })
    }

  },

  destroy(req, res) {
    const id = req.params.id

    if(BooksPolicy.for('destroy', req.user, Books.find(id))) {
      Books.destroy(id)
      res.status(204)
    } else {
      res
        .status(401)
        .json({
          book: {
            errors: ['You are not allowed to delete the book.']
          }
        })
    }
  }
}

export default BooksController
