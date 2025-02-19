import Phonebook from "./index1.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

function errorHandler(err, req, res, next) {
    console.error("tappara1");
    res.status(504).json({ error111: "error: " + err.message });
}
var app = express();

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('dist1'))
app.use(bodyParser.json());

app.get('/y', (req, res,next) => {
    next(new Error('Not Found'));
    //res.send('Hello World!')
})


app.post('/api/person', (req, res,next)  => {


     //next(new Error('Not Found').message="antto");

    // Send a response back to the client
    if(req.body.name==="")  {
        const error = new Error("name is missing");
        next(error);
        return
    }

    if(req.body.number==="")  {
        console.log("jes");
        const error = new Error("Phone number is missing");
        next(error);
        //res.status(400).json({ error: "Phone number is missing" });
        return
    }
/*
    if(persons.filter(person =>person.name===req.body.name).length>0) {
      res.status(400).json({ error: "Name must be unique" });
        return
    }
    */

   var person={};
    person.name=req.body.name;
    person.number=req.body.number;
    let  book=new Phonebook()
    book.Addrecord(person.name,person.number);
    res.status(200).json({ message :  "OK : Added " + req.body.name + req.body.number    });
});

app.get('/info', (req, res) => {
    var now = new Date();
    res.status(200).send('Phonebook has info for '  );
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


app.use(errorHandler);
//app.use(morgan());

const PORT = 3001

app.listen(PORT)
console.log(`Server running on port ${PORT}`)

