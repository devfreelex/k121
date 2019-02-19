const mongoose = require('mongoose')
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const UserModel = require('../schemas/user.schema.js')
const RaffleModel = require('../schemas/raffle.schema.js')
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

        const sendMessage = (user) => {
            // console.log(user.name, user.friend.name)
            const mailOptions = {
                from: 'rodrigo.desenvolvedor.web@gmail.com',
                to: user.email,
                subject: 'E seu amigo secreto é!...',
                generateTextFromHTML: true,
                html: `
                <div style="font-size:18px; padding:15px; border:3px #ebebeb dashed">
                    <p> 
                        É com muito prazer que te falamos quem é seu 
                        mais novo amigo secreto...
                    </p>
                    <p>
                        Divirta-se muito com o <b style="color:#a322ff">${user.friend.name}</b>, ele é o seu
                        amigo secreto tão esperado.
                    </p>
                </div>
                <p style="font-size:14px">
                    <b>Ass:</b> Amigo secreto App. Uhhuuuu!!!
                </p>`
            };

            smtpTransport.sendMail(mailOptions, (error, response) => {
                error ? console.log(error) : console.log(response);
                smtpTransport.close();
            });
        }



        const friends = await getRaffle()
        friends.forEach( friend => {
            sendMessage(friend)
        })



    }

    const getRandomEntry = (count) => {
        return  Math.floor(Math.random() * count);
    }

    const toObjectId = (id) => {
        return new mongoose.mongo.ObjectId(id)
    }

    const sortUsers = () => {
        return UserModel.aggregate([{$sample: {size: 1000}}])
        .exec()
        .then( users => {
            const friends = users.filter( (user, index) => {
                const firstIndex = 0
                let nextUser = index + 1
                const lastIndex = 1
                const lastUser = users[users.length - lastIndex]
                const firstUser = users[firstIndex]

                if(index < (users.length - lastIndex)) {
                    user.friend = users[nextUser]
                    return user
                }
                lastUser.friend = firstUser
                return lastUser
            })
            return friends
        })
        .catch( err => console.log(err))
    }

    const getRaffle = async function(ctx, next) {
        const friends = await sortUsers()
        // ctx.status = 200
        // ctx.body = friends
        return friends
    }

    return { sortUsers, getRaffle, sendEmail }

}