const axios = require('axios');
const Session = require('../models/Session');

const CreateSession = async ({user, userAgent}) => {
    const session = await Session.create({user, userAgent});
    return session;
}


module.exports = CreateSession;