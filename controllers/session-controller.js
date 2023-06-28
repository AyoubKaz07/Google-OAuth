const {GetGoogleOauthToken, GetGoogleUser} = require('../services/user-service');
const CreateSession = require('../services/session-service');
const jwt = require('jsonwebtoken');

const GoogleOAuthHandler = async (req, res, next) => {
    try {
        const code = req.query.code;
        if (!code){
            return res.status(400).json({message: 'Bad request. Code is missing.'});
        }
    
        const {id_token, access_token} = await GetGoogleOauthToken(code);

        const user = await GetGoogleUser(access_token, id_token);
        console.log(user);

        if (!user.verified_email) {
            return res.status(403).json({message: 'User email not verified by Google.'});
        }

        // create a session
        const session = await CreateSession({user: user._id, userAgent: req.headers['user-agent']});

        // create a JWT access token
        const AccessToken = await jwt.sign({session_id: session._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: '15m'})

        // create a JWT refresh token
        const RefreshToken = await jwt.sign({session_id: session._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: '7d'})

        res.cookie('AccessToken', AccessToken)
        res.cookie('RefreshToken', RefreshToken)
        console.log(session);
        res.redirect('http://localhost:8000/home')
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: 'Failed to authorize Google user.'});
        res.redirect('http://localhost:8000/')
    }
}

module.exports = GoogleOAuthHandler