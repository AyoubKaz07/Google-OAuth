const express = require('express')
const app = express()
const connectDB = require('./utils/DBconnect')
const UrlRouter = require('./routes/authwithgoogle')
const AuthRouter = require('./routes/googleOAuth')
const Session = require('./models/Session')


app.get('/', (req, res) => {
    const htmlResponse = `
    <!-- Your HTML home page -->
    <!DOCTYPE html>
    <html>
    <head>
    <title>Home Page</title>
    </head>
    <body>
    <button id="googleAuthButton">Authenticate with Google</button>
    
    <script>
    document.getElementById('googleAuthButton').addEventListener('click', () => {
        // Fetch the Google authentication URL from the server
        fetch('/google-auth-url')
        .then((response) => response.text())
        .then((url) => {
            // Redirect the user to the Google authentication consent page
            window.location.href = url;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
    </script>
    </body>
    </html>    
    `;
    
    res.send(htmlResponse);
});

app.use('/google-auth-url', UrlRouter);
app.use('/api/sessions/oauth/google', AuthRouter)
  
// Route handler for the home page
app.get('/home', (req, res) => {
  res.send('Welcome to the home page! You are logged in with Google');
});

const PORT = process.env.PORT || 8000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () =>
        console.log(`Server is listening on port ${PORT}...`)
        )
    } catch (error) {
        console.log(error);
    }
};
start()