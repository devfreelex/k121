const mongoose = require('mongoose')

const Schema = mongoose.Schema

const raffleSchema = new Schema({
    status:{ type: Boolean, required: true, default:false },
    friends: []
})

raffleSchema.statics = {
    setOpen: function() {
        this.findOneAndUpdate({}, {$set: {status: true}})
    },
    setClose: function () {
        this.findOneAndUpdate({}, {$set: {status: false}})
    },
    saveFriends: function(frinds) {
        
    }
}

module.exports = mongoose.model('Raffle', raffleSchema)