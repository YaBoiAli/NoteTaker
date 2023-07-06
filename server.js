const express = require("express");
const path = require("path");
const fs = require('fs');
const db = require('./Develop/db/db.json');

const app = express();
const PORT = 3001;


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
  console.log("delete review");
});

app.post('/api/notes', (req, res) => {
    db.push(req.body)
    fs.writeFile('Develop/db/db.json', JSON.stringify(db), (err) =>
    err ? res.json(err) : res.json('Success!')
 ); 
})


app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
});


