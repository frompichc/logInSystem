const User = require('../models/userModel')
const bcrypt = require ('bcrypt');
const userRouter = require('express').Router();

userRouter.post('/create-user', async (request, response) => {
    const email = request.body.email;
    try {
        const userExist = await User.findOne({ email })
        if (userExist) {
            response.status(500).
            json({success : false, message :"This email is already in use", objectMessage : "alert-message-email"});
        } else {
            const user = new User(request.body);
            await bcrypt.genSalt(10)
                    .then(salt => bcrypt.hash(user.password, salt))
                    .then(hash => user.password = hash)
            await user
                .save()
                .then(result => {
                response.status(201).json(result);
            })
        }
    } catch(error) {
        response.status(500).json({success: false, message :"An error ocurred with the registration", ObjectMessage : ""})
    }
 
})

userRouter.post('/login', async (request, response) => {
    const email = request.body.email;
    try {
        const userExist = await User.findOne({ email })
        if (userExist) {
            bcrypt.compare(request.body.password, userExist.password, function (err, result) {
                if (result) {
                    response.status(200).json({success: true, message :`Welcome ${userExist.name}`});
                } else {
                    response.status(401).json({success: false, message :`User or password is incorrect`, objectMessage : ""});
                }
            })
        } else {
            response.status(401).json({success: false, message :`User does not exist`})
        }
    } catch(error) {
        response.status(500).json({success: false, message :`An error ocurred`})
    }
})

module.exports = userRouter