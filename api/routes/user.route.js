const koaRouter = require('koa-router')
const userContoller = require('../controllers/user.controller.js')()

module.exports = () => {
    const routes = new koaRouter({
        prefix: '/api'
    })
    
    routes
        .get('/users', userContoller.getUsers)
        .post('/users', userContoller.addUser)

    routes
        .put('/users/:id', userContoller.updateUser)
        .delete('/users/:id', userContoller.removeUser)

    return routes
}
