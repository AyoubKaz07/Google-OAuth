require('dotenv').config()

module.exports =  GetGoogleUrl = () => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'

    const options = {
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
    }

    const querystring = new URLSearchParams(options).toString()
    
    return `${rootUrl}?${querystring}`
}