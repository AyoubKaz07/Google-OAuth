const GetGoogleUrl = require('../utils/getgoogleurl')

const AuthGoogleUrl = (req, res) => {
    const GoogleUrl = GetGoogleUrl()
    res.send(GoogleUrl)
}

module.exports = AuthGoogleUrl