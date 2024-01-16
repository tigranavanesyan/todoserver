const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 
require('dotenv').config(); 
const Todo = require('./models/Todo');

//Execute express 
const app = express(); 

//Middlewares
app.use(express.json()); 
app.use(cors()); 

const port = 4001; 

const connectionString = process.env.MONGO_URI; 
mongoose.connect(connectionString)
        .then(() => console.log('Connected to the database…')) 
        .catch((err) => console.error('Connection error:', err));


        //routes 
app.get('/to-do-app', async(req,res)=> {
    const todos = await Todo.find();
    res.json(todos)
})

app.post('/to-do-app/new', async(req,res)=> {
    const task = await Todo.create(req.body)
    res.status(201).json({task})
})

app.put('/to-do-app/update/:id', async (req, res) => {
    try {
        const result = await Todo.findByIdAndUpdate(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/to-do-app/delete/:id', async(req,res)=>{
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result)
})


app.listen(port, () => console.log(`Server is running on port ${port}`)); 