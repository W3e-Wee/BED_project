// ================================
// imports
// ================================
const mysql = require("mysql");

// ================================
// main
// ================================
var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '4ccCr3@ted', //your own password
        database: 'assignment',
        dateStrings: true

        });

        return conn;
    }
  };

// ================================
// exports
// ================================
module.exports = dbconnect;