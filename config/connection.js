
var mysql = require("mysql");

var connection;

if(process.env.JAWSDB_URL){
connection = mysql.creatConnection(process.env.JAWSDB_URL);

}else{

  connection = mysql.creatConnection({

    host: 'localhost',
    user: 'root',
    password: ''
    database:'film_db'
  });
};

connection.connect();
module.exports = connection;