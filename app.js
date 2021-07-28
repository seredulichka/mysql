const mysql = require('mysql');

//config
const pool = mysql.createPool({
    host: "localhost",
    port: "8889",
    user: "root",
    database: "users",
    password: "root",
    socket: "/Applications/MAMP/tmp/mysql/mysql.sock"
});

// проверять подключилось ли к датабейс ( это если юзать const сonnection = mysql.createСonnection({...}))
// connection.connect(err =>{
//     if(err){
//         console.log(err);
//         return err;
//     } else {
//         console.log('Database ok');
//     }
// })


let sqlCommand1 = "SELECT * FROM info";

pool.query(sqlCommand1, (err, result, field) => {
    console.log(err);
    console.log(result);
    console.log(result[0].name); //обратится определенному результату 
    //console.log(field); - выводит служебные данные о информации полей 
})


const user1 = ["David", "1978-8-11"];
const sqlCommand2 = "INSERT INTO info(name, birth) VALUES(?, ?)";
 
pool.query(sqlCommand2, user1, function(err, results) {
    if(err){
        console.log(err);
    } else {
        console.log("Данные добавлены");
    }
});

//закрывать соединение  - это 

//!!!     нужно сделать асинхронный чтобы не выполнилось перед основными коммандами    !!!
// connect.end(err =>{
//     if(err){
//         console.log(err);
//         return err;
//     } else {
//         console.log('Database close');
//     }
// })