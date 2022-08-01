const router = require('express').Router(); // imports express router
const fs = require('fs'); // imports fs
const path = require('path'); // imports path
const uuid = require('uuid'); // imports uuid

const dbPath = path.join(__dirname, '..', 'db', 'db.json'); // crteates filepath for db.json

// function reades db.json file for notes and returns content of file
function getNotes() {
    const content = fs.readFileSync(dbPath, 'utf-8'); // reads db.json
    return JSON.parse(content) || []; // returns content of db.json
}

// function saves note created by user
function saveNote(title, text) {
    // creates new object variable containing an id, title, and text
    const newNote = {
        id: uuid.v4(),
        title,
        text,

    }
    // creates variable notes containing currently saved notes
    const notes = getNotes(); 
    // adds new note to saved notes
    notes.push(newNote);

    // writes notes in string format to db.json 
    fs.writeFileSync(dbPath, JSON.stringify(notes), 'utf-8')

    return newNote; 
}

// function deletes a saved note, importing id
function deleteNote(id) {

    const notes = getNotes(); // creates variable containing saved notes

    // filters notes via id and creates variable containing notes that do not match imported id
    const filtered = notes.filter((note) => note.id !== id); 

    // writes new notes list to db.json
    fs.writeFileSync(dbPath, JSON.stringify(filtered), 'utf-8');
}
// create notes variable and respond with notes variable when GET request made to notes.html
router.get('/notes', (req, res) => {
    const notes = getNotes(); // creates variable containing saved notes

    res.json(notes); // responds with saved notes
});
// creates created variable and responds with created variable once POST request made to notes.html
router.post('/notes', (req, res) => {
    const created = saveNote(req.body.title, req.body.text); // creates variable containing retunred value of function saveNote
    res.json(created);
});

// deletes note containing specified id once DELETE request made to notes.html
router.delete('/notes/:id', (req, res) =>{
    deleteNote(req.params.id); // calls upon deleteNote id importing specified id
    res.json({
        data: 'ok',
    })
}) 

module.exports = router; // exports router