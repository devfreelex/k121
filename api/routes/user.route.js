const koaRouter = require('koa-router')
const userContoller = require('../controllers/user.controller.js')()
const sendMailController = require('../controllers/send.mail.controller.js')()

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

    routes
        .post('/send', sendMailController.sortUsers)

    return routes
}
