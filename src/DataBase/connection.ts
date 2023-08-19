const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    Database: 'childcare'
});

con.connect(function(err:any) {
    if (err) throw err;
    console.log("Connected!");
  });
  module.exports=con;