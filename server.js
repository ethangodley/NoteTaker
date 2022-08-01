const express = require('express'); // import express
const webRoutes = require('./routes/web'); // import web route
const apiRoutes = require('./routes/api'); // import api route
const PORT = process.env.PORT || 3001; // create variable containing port

const app = express(); // create variable app containing data of express()

// middleware requriements
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(webRoutes);
app.use('/api', apiRoutes);

// responds with 404 error when invalid GET request made
app.get('*', (req, res) => {
    res.status(404).send('page not found');
});
// listens for connections on the specified port
app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`);
})