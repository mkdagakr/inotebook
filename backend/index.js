const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

mongoose.connect(mongoURI, (err)=>{
    if(err){
        console.log(`Unable to connect: ${err}`);
    }
    else{
        console.log("MongoDB is connected");
    }
})

app.use(cors());
app.use(express.json());

// respond with "hello world" when a GET request is made to the homepage
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'))

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})

