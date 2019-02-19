const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    email: {type: String, unique:true, required: true}
})

UserSchema.methods = {
    createUser: function () {
        return this.save()
        .then((data) => {
            return data
        })
        .catch(err => {
            return {error: err.code, message: err.message}
        })
    }
}

UserSchema.statics = {
    getUsers: function () {
        return this.find({})
        .then( data => {
            return data
        }) 
        .catch(err => {
            return {error: err.code, message: err.message}
        })
    },
    updateUser: function(query, payload) {
        return this.findOneAndUpdate(query, {$set: payload}, {new: true})
        .then( data => data)
        .catch(err => {
            return {error: err.code, message: err.message}
        })
    },
    removeUser: function(query) {
        return this.findOneAndDelete(query)
        .then( data => data)
        .catch(err => {
            return {error: err.code, message: err.message}
        })
    }
}
module.exports = mongoose.model('User', UserSchema)