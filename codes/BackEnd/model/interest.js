// --------------------------------
// import
// --------------------------------
const db = require("../controller/dataBaseConfig");

// --------------------------------
// main
// --------------------------------
const Interest = {
    addInterest: function (id, interest, callback) {

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
                interest(user_id, category_id)
            VALUES
                (?, ?);
            `;

                for (let i = 0; i < interest.length; i++) {
                    dbConn.query(sql, [id, interest[i]], (error, q_result) => {
                        if (error) {
                            console.log("query error");
                            console.log(error);
                            return callback(error, null);
                        }

                        console.log(q_result);

                        return callback(null, q_result);
                    })
                }


                // for (let i = 0; i < interest.length - 1; i++) {
                //     dbConn.query(sql, [id, interest[i]], (error, result) => {
                //         if (error) {
                //             console.log("query error!!!");
                //             console.log(err);

                //             return callback(error, null);
                //         }
                //             console.log(result);
                //     });
                // } // FIRST FOR LOOP END 
                // for (let i = interest.length - 1; i < interest.length; i++) {
                //     dbConn.query(sql, [id, interest[i]], (error, result) => {
                //         if (error) {
                //             console.log("query error");
                //             console.log(error);

                //             return callback(error, null);
                //         }
                //             console.log(result);
                //             return callback(null, result); 
                //     });
                // } // SECOND FOR LOOP END (returns result)  
                dbConn.end();
            }
        });
    },

    showInterest: function (id, callback) {

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
                    interest INNER JOIN  category ON interest.category_id = category.categoryid
                WHERE
                    interest.user_id = ?
                `;

                dbConn.query(sql, [id], (error, q_result) => {
                    dbConn.end();
                    if (error) {
                        console.log("query error");
                        console.log(error);
                        return callback(error, null);
                    }

                    console.log(q_result);

                    return callback(null, q_result);
                })

            }
        });
    },

    deleteInterest: function (id, callback) {

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
                DELETE FROM
                    interest
                WHERE
                    interest.user_id = ?
                `;

                dbConn.query(sql, [id], (error, q_result) => {
                    dbConn.end();
                    if (error) {
                        console.log("query error");
                        console.log(error);
                        return callback(error, null);
                    }

                    console.log(q_result);

                    return callback(null, q_result);
                })

            }
        });
    },
}

// --------------------------------
// export
// --------------------------------
module.exports = Interest;