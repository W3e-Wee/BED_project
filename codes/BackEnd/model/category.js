// ================================
// import
// ================================
const db = require("../controller/dataBaseConfig");

// ===============================
// main
// ===============================
const Category = {
    addCategory: function (category, callback) {

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
                        category (category, description)
                    VALUES
                        (?, ?);
                `;

                dbConn.query(sql, [category.e_category, category.e_description], (error, q_result) => {
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

    showAllCategories: function(callback){

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
                    SELECT
                        CONVERT(categoryid, CHAR) AS categoryid,
                        category,
                        description
                    FROM
                        assignment.category
                `;

                dbConn.query(sql, [], (error, q_result) => {
                    dbConn.end();

                    if(error) {
                        console.log("query error");
                        console.log(error);
                        return callback(error, null);
                    }
                    else {
                        if(q_result.length == 0){
                            console.log(q_result);
                            return callback(null, null);
                        }
                        else {
                            console.log(q_result);
                            return callback(null, q_result);
                        }
                    }
                })
            }
        })
    },

    showCategoryByID: function(catID, callback) {
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
                    SELECT
                        category,
                        description
                    FROM
                        assignment.category
                    WHERE
                        categoryid = ?
                `;

                dbConn.query(sql, [catID], (error, q_result) => {
                    dbConn.end();

                    if(error) {
                        console.log("query error");
                        console.log(error);
                        return callback(error, null);
                    }
                    else {
                        if(q_result.length == 0){
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
    }
};

// ===============================
// export
// ===============================
module.exports = Category;