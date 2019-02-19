const UserModel = require('../schemas/user.schema.js')

module.exports = () => {

    const getUsers = async (ctx, next) => {
        const data = await UserModel.getUsers()
        ctx.body = data
    }

    const addUser = async (ctx, next) => {
        const { body } = ctx.request
        const user = new UserModel(body)
        const data = await user.createUser()
        ctx.body = data
    }

    const updateUser = async (ctx, next) => {
        const id = ctx.params.id
        const user = ctx.request.body
        const data = await UserModel.updateUser({_id: id}, user)
        ctx.body = data
    }

    const removeUser = async (ctx, next) => {
        const id = ctx.params.id
        const user = ctx.request.body
        const data = await UserModel.removeUser({_id: id})
        ctx.status = 200
        ctx.body = data
    }

    return {
        getUsers, addUser, updateUser, removeUser
    }

}