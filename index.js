const express = require("express");
const cors = require("cors"); 
const pool = require("./db"); 

const app = express(); 

//Middlewares
app.use(cors());
app.use(express.json());


//Routes

//create a todo
app.post("/todos" , async(req , res) => {
    try{
        const {description} = req.body; 
        
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *;",[description]);
        
        res.send(newTodo.rows[0]); 
    }catch(err){
        console.log(err); 
    }
})

//get all todos 
app.get("/todos" , async(req , res) => {

    try{
        const todos = await pool.query("SELECT * FROM todo"); 
        res.send(todos.rows); 
    }catch(err)
    {
        console.log(err); 
    }
})

// get a particular todo

app.get("/todos/:id",async(req , res) => {
    try{
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1;" ,[req.params.id]);
        res.send(todo.rows[0]); 
    }catch(err){

    }
})
//update a todo
app.put("/todos/:id", async(req, res) => {
    try{
        const id = req.params.id; 
        const {description} = req.body; 
        const todo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *;",[description , id]);
        res.send(todo.rows);
    }catch(err)
    {
        console.log(err); 
    }
});

//delete a todo

app.delete("/todos/:id" , async(req , res) => {
    try{
        const id = req.params.id; 

        const todo = await pool.query("DELETE FROM todo WHERE todo_id = $1 RETURNING *;",[id]);
        
        res.send(todo.rows); 
    }catch(err)
    {
        console.log(err); 
    }  
})

app.listen(4000 , () => {
    console.log("Listening on port 4000"); 
})