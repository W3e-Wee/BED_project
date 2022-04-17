// ================================
// import
// ================================
const db =  require("../controller/dataBaseConfig");

// ================================
// main
// ================================
const Review = { 
    addReview: function(pdt_id, review, callback){

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
                    INSERT INTO
                        review (user_id, pdt_id, rating, review)
                    VALUES
                        (?, ?, ?, ?);
                `;

                dbConn.query(sql, [review.e_userid, pdt_id, review.e_rating, review.e_review], (error, q_result) => {
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

    getReviewByPdtID: function(pdt_id, callback){

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
                        review.user_id,
                        user.username,
                        review.rating,
                        review.review
                    FROM
                        review
                        INNER JOIN product ON review.pdt_id = product.product_id
                        INNER JOIN user ON review.user_id = user.id
                    WHERE
                        review.pdt_id = ?
                `;

                dbConn.query(sql, [pdt_id], (error, q_result) => {
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
};

// ================================
// export
// ================================
module.exports = Review;