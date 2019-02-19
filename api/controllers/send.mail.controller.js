const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const UserModel = require('../schemas/user.schema.js')
const OAuth2 = google.auth.OAuth2;

module.exports = () => {

    const sendEmail = async () => {

        const oauth2Client = new OAuth2(
            '1037815457371-5id7vfavp9ihimqofj0fkno8nq2fopdl.apps.googleusercontent.com',
            '4L0Sl_UyjdyU21G3wDgvqrhM',
            'https://developers.google.com/oauthplayground'
        );

        oauth2Client.setCredentials({
            refresh_token: '1/hMXzXpH-cdKU2IRu2wBehyV0ikI1JmHGn8XblRwPH7M'
        });
        const tokens = await oauth2Client.refreshAccessToken()
        const accessToken = tokens.credentials.access_token

        const smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'rodrigo.desenvolvedor.web@gmail.com',
                clientId: '1037815457371-5id7vfavp9ihimqofj0fkno8nq2fopdl.apps.googleusercontent.com',
                clientSecret: '4L0Sl_UyjdyU21G3wDgvqrhM',
                refreshToken: 'Y1/hMXzXpH-cdKU2IRu2wBehyV0ikI1JmHGn8XblRwPH7M',
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: 'rodrigo.desenvolvedor.web@gmail.com',
            to: 'rodrigo.desenvolvedor.web@gmail.com',
            subject: 'A boa garota jenyffer',
            generateTextFromHTML: true,
            html: '<b>A jenyffer é uma garota tranquila!</b>'
        };

        smtpTransport.sendMail(mailOptions, (error, response) => {
            error ? console.log(error) : console.log(response);
            smtpTransport.close();
        });

    }

    const getRandomEntry = (count) => {
        return  Math.floor(Math.random() * count);
    }

    const sortUsers = (ctx, next) => {
        UserModel.aggregate([{$sample: {size: 1000}}])
        .exec()
        .then( users => {
            const friends = users.filter( (user, index) => {
                const firstIndex = 0
                let nextUser = index + 1
                const lastIndex = 1
                const lastUser = users[users.length - lastIndex]
                const firstUser = users[firstIndex]

                if(index < (users.length - lastIndex)) {
                    user.friend = users[nextUser]['_id']
                    return user
                }
                lastUser.friend = firstUser['_id']
                return lastUser
            })
        })
        .catch( err => console.log(err))
    }

    return { sortUsers }

}