// ================================
// import
// ================================
const db = require("../controller/dataBaseConfig");

// ================================
// functions
// ================================

const User = {
    verify: function (userData, callback) {

        var dbConn = db.getConnection();

        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                console.log("connection error");
                return callback(err, null)
            }
            else {
                const sql = `
                    SELECT 
                        *
                    FROM
                     assignment.user
                    WHERE
                    username = ? AND
                    password = ?
                `;

                dbConn.query(sql, [userData.e_username, userData.e_password], (error, result) => {
                    dbConn.end();

                    if (error) {
                        console.log(error);
                        console.log("query error");

                        return callback(error, null);
                    }
                    else if (result.length == 0) {

                        return callback(null, null)
                    }
                    else {

                        return callback(null, result[0]);
                    }
                })
            }
        })
    },

    addUser: function (user, callback) {

        // establish conection with database
        var dbConn = db.getConnection();

        // connect with database
        dbConn.connect(function (err) {
            if (err) {
                console.log("connection error!");
                console.log(err);
                return callback(err, null);
            }
            else {
                const sql = `
                    INSERT INTO
                        user (username, email, contact, password, type, profile_pic_url)
                    VALUES
                        (?, ?, ?, ?, ?, ?);
                `;

                dbConn.query(sql, [user.d_username, user.d_email,
                user.d_contact, user.d_password, user.d_type, user.d_profile_pic_url], (error, q_result) => {
                    dbConn.end();

                    if (error) {
                        console.log("query error");
                        console.log(error);
                        return callback(error, null);
                    }
                    else {
                        console.log(q_result);
                        return callback(null, q_result);
                    }
                })
            }
        })
    },

    findUserByID: function (id, callback) {

        // establish conection with database
        var dbConn = db.getConnection();

        // connect with database
        dbConn.connect(function (err) {
            if (err) {
                console.log("connection error!");
                console.log(err);
                return callback(err, null);
            }
            else {
                const sql = `
                    SELECT
                        *
                    FROM
                        user
                    WHERE
                        id = ?
                `;

                dbConn.query(sql, [id], (error, q_result) => {
                    dbConn.end();

                    if (error) {
                        console.log("query error");
                        console.log(error);
                        return callback(error, null);
                    }
                    else {
                        if (q_result.length == 0) {
                            console.log(q_result);
                            return callback(null, null);
                        }
                        else {
                            console.log(q_result);
                            return callback(null, q_result[0]);
                        }
                    }
                })
            }
        })
    },

    editUser: function(id, user, callback){

        // establish conection with database
        var dbConn = db.getConnection();

        // connect with database
        dbConn.connect(function(err){
            if(err){
                console.log("connection error!");
                console.log(err);
                return callback(err, null);
            }
            else {
                const sql = `
                    UPDATE
                        user
                    SET 
                        username = ?, 
                        email = ?, 
                        contact = ?, 
                        password = ?, 
                        type = ?, 
                        profile_pic_url = ?
                    WHERE
                        id = ?
                `;

                dbConn.query(sql, [user.d_username, user.d_email, 
                    user.d_contact, user.d_password, 
                    user.d_type, user.d_profile_pic_url, id], (error, q_result) => {
                    dbConn.end();

                    if(error) {
                        console.log("query error");
                        console.log(error);
                        return callback(error, null);
                    }
                    else {
                        console.log(q_result);
                        return callback(null, q_result);
                    }
                })
            }
        })
    },

}

// ================================
// export
// ================================
module.exports = User;