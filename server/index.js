//to do server
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path'
import fs from 'fs';

const urlJSON = '/database/tasks.json'
const app = express();

app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
})

app.get("/", (req, res) => {
    res.redirect("/home")
})

app.post('/addnew', (req, res) => {
    console.log("yo")
    fs.readFile('/database/tasks.json', 'utf-8', (err, res) => {
        if (err) {
            throw err
            console.log(err)
        };
        let database = JSON.parse(res);
        let len = database.taches.length;

        let newTodo = req.body;

        newTodo.id = (len + 1).toString();
        database.taches.push(req.body);

        let newDatabase = JSON.stringify(database, null, 2)

        fs.writeFile("/database/tasks.json", newDatabase, (err) => {
            if (err) {
                throw err
            }
        });
    });
});

app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', urlJSON));
})

app.listen(8000, () => console.log('LISTEN ON PORT 8000'));