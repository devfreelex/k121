const koaRouter = require('koa-router')
const userContoller = require('../controllers/user.controller.js')()
const sendMailController = require('../controllers/send.mail.controller.js')()

module.exports = () => {
    const routes = new koaRouter({
        prefix: '/api'
    })
    
    routes
        .get('/users', userContoller.getUsers)
        .get('/users/raffle', sendMailController.sendEmail)
        .post('/users', userContoller.addUser)

    routes
        .put('/users/:id', userContoller.updateUser)
        .delete('/users/:id', userContoller.removeUser)


    return routes
}
