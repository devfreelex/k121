const mongoose = require('mongoose')

module.exports = () => {

    const uri = 'mongodb://rlrocha:nano2503*@ds141815.mlab.com:41815/users'
    mongoose.set('useFindAndModify', false)
    mongoose.connect(uri, {
        useCreateIndex: true,
        useNewUrlParser: true
    })
    
    const db = mongoose.connection
    
    db.on('error', error => {
        throw new Error(`Error connecting to db: ${error}`)
    })
    
    db.once('open', () => console.log('database connected: ', uri))
}

