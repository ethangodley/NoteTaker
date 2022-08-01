const router = require('express').Router(); // imports router
const path = require('path'); // imports path

const publicPath = path.join(__dirname, '..', 'public'); // creates path to public directory

// responds with index.html file once GET request made
router.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// responds with notes.html page once GET request made
router.get('/notes', (req, res) => {
    res.sendFile(path.join(publicPath, 'notes.html'));
});

module.exports = router; // exports router