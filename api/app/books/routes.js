import controller from './controller'

export function setup(router) {
  router
    .get('/search', controller.search)
    .get('/:id', controller.get)
    .get('/', controller.getAll)
    .post('/', controller.create)
    .patch('/:id', controller.update)
    .delete('/:id', controller.destroy)
}
