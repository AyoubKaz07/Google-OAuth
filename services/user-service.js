const axios = require('axios');
const User = require('../models/User');


const GetGoogleOauthToken = async (code) => {
    const rootUrl = 'https://oauth2.googleapis.com/token';

    const options = {
        code, 
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
        grant_type: 'authorization_code',
    };
    try {
        const {data} = await axios.post(rootUrl, options, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return data;
    }
    catch (error) {
        console.log('Failed to fetch access token from Google.')
        throw new Error(error.message);
    }
};

const GetGoogleUser = async (access_token, id_token) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Failed to fetch user from Google.");
      throw new Error(error.message);
    }
}


module.exports = {GetGoogleUser, GetGoogleOauthToken}