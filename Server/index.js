const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "employeeSystem",
});

// Get DATA
app.get("/employee", (req, res) => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Insert
app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const phone = req.body.phone;

  db.query(
    "INSERT INTO employee (name,age,country,Phonenumber) VALUES(?,?,?,?)",
    [name, age, country, phone],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Value inserted");
        console.log("Insert Success!")
      }
    }
  );
});

//Update

app.put('/update' , (req,res) => {
    const id = req.body.id;
    const phone = req.body.phone;

    db.query("UPDATE employee SET Phonenumber = ? WHERE id = ?" , [phone,id], (err,result)=>{
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

//Delete

app.delete('/delete/:id', (req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM employee WHERE id = ?", id , (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

//Set Port
app.listen("3001", () => {
  console.log("Server is running on port 3001");
});
