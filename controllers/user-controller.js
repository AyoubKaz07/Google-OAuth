const {CreateUser} = require('../services/user-service')

const CreateUserHandler = async (req, res) => {
    try {
        const user = await CreateUser(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const GetUserHandler = async (req, res) => {
    res.send(res.locals.user);
}

module.exports = {CreateUserHandler, GetUserHandler}