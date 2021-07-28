const mysql = require('mysql');
const express = require("express");
const path = require('path');
const app = express();


//config
const pool = mysql.createPool({
    host: "localhost",
    port: "3306", 
    user: "root",
    database: "users",
    password: "pebara58"
});

// const pool = mysql.createPool({
//     host: "localhost",
//     port: "8889",
//     user: "root",
//     database: "users",
//     password: "root",
//     socket: "/Applications/MAMP/tmp/mysql/mysql.sock"
// });

app.use('/public', express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: false }));
  

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index1.html'));
});


app.get('/allusers', (req, res) => {
    let sql = 'SELECT * FROM info'
    pool.query(sql, (err, data) => {
        if(err) {
            throw err;
        }
        res.json(data);
    })
})


app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'))
})

app.post('/', (req,res)=>{
    const newUser = [req.body.name, req.body.birth];
    const sqlCommand2 = "INSERT INTO info(name, birth) VALUES(?, ?)";

    pool.query(sqlCommand2, newUser, function(err, results) {
        if(err){
            console.log(err);
            console.log(req.body.name, req.body.birth);
        } else {
            res.send('successfuly posted data');
        }
    });
})

// проверять подключилось ли к датабейс ( это если юзать const сonnection = mysql.createСonnection({...}))
// connection.connect(err =>{
//     if(err){
//         console.log(err);
//         return err;
//     } else {
//         console.log('Database ok');
//     }
// })




//add data to database

// const user1 = ["David", "1978-8-11"];
// const sqlCommand2 = "INSERT INTO info(name, birth) VALUES(?, ?)";

 
// pool.query(sqlCommand2, user1, function(err, results) {
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Данные добавлены");
//     }
// });


app.listen(3003, () => {
    console.log("Server running on port 3003");
});


//!!!     нужно сделать асинхронный чтобы не выполнилось перед основными коммандами    !!!
// connect.end(err =>{
//     if(err){
//         console.log(err);
//         return err;
//     } else {
//         console.log('Database close');
//     }
// })
