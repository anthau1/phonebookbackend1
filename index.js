

import Phonebook from "./index1.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
var app = express();

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//app.use(morgan());


app.post('/api/person', (req, res) => {
    const data = req.body.data;
    // Send a response back to the client
    if(req.body.name==="")  {
        res.status(400).json({ error: "Name is missing" });
        return

    }

    if(req.body.phone==="")  {
        res.status(400).json({ error: "Phone number is missing" });
        return
    }

    if(persons.filter(person =>person.name===req.body.name).length>0) {
      res.status(400).json({ error: "Name must be unique" });
        return
    }

   var person={};
    person.name=req.body.name;
    person.number=req.body.number;
    let  book=new Phonebook()
    book.Addrecord(person.name,person.number);
    res.status(400).json({ error:  "Added " + req.body.name + req.body.number    });
});

app.get('/info', (req, res) => {
    var now = new Date();
    res.status(200).send('Phonebook has info for ' + persons.length + ' people  ' + now);
});

app.get('/api/all', async  (request, response) => {
    const book=new Phonebook()
    response.json( await book.GetAll())
})

app.get('/api/persons/:id', (request, response) => {
    response.json(persons.filter((person) => person.id === id)[0])
})

app.delete('/api/person/:id', (request, response) => {
    const id = request.params.id
    const book=new Phonebook()
    book.Deletereord(id)
    response.sendStatus(200);
})

const PORT = 3001

app.listen(PORT)
console.log(`Server running on port ${PORT}`)

