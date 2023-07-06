const express = require("express");
const path = require("path");
const fs = require('fs');
const db = require('./Develop/db/db.json');
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(express.static('Develop/public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'Develop/public/notes.html'))
);

app.get('/api/notes', (req,res) =>{
  res.json(db);
});

app.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;

  // Find the index of the note with the matching ID
  const noteIndex = db.findIndex(note => note.id === noteId);

  if (noteIndex !== -1) {
    // Remove the note from the array
    db.splice(noteIndex, 1);

    // Save the updated array to the db.json file
    fs.writeFile('Develop/db/db.json', JSON.stringify(db), (err) =>
      err ? res.json(err) : res.json('Note deleted!')
    );
  } else {
    res.status(404).json('Note not found!');
  }
});

app.post('/api/notes', (req, res) => {
  const newNote = {
    id: uuidv4(), // Generate a unique ID
    ...req.body // Add the rest of the note data from the request body
  };

  db.push(newNote);
  fs.writeFile('Develop/db/db.json', JSON.stringify(db), (err) => {
    if (err) {
      res.json(err);
    } else {
      res.json('Success!');
    }
  });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`App is listening on ${PORT}`);
});


  