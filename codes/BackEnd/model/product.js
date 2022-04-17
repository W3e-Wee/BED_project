// ================================
// import
// ================================
const e = require("express");
const db = require("../controller/dataBaseConfig");

// ===============================
// main
// ===============================
const Product = {
    addProduct: function (product, callback) {

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
                        product (name, brand, price, screensize, processor, memory, storage, os, category_id )
                    VALUES
                        (?, ?, ?, ?, ?, ?, ?, ?, ?);
                `;

                dbConn.query(sql, [product.e_name, product.e_brand, product.e_price, product.e_screensize, product.e_processor,
                product.e_memory, product.e_storage, product.e_os, product.e_categoryid], (error, q_result) => {
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

    showProductByCatID: function (cid, callback) {

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
                        p.product_id,
                        p.name,
                        p.price,
                        p.screensize,
                        p.processor,
                        p.memory,
                        p.storage,
                        p.os
                    FROM
                        assignment.product AS p 
                    INNER JOIN 
                        category 
                    ON 
                    p.category_id = category.categoryid
                    WHERE
                        p.category_id = ?
                `;

                dbConn.query(sql, [cid], (error, q_result) => {
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
                            return callback(null, q_result);
                        }

                    }
                })
            }
        })
    },

    showProductByID: function (pid, callback) {

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
                        assignment.product AS p
                    WHERE
                        p.product_id = ?
                `;

                dbConn.query(sql, [pid], (error, q_result) => {
                    dbConn.end();

                    if (error) {
                        console.log("query error");
                        console.log(error);
                        return callback(error, null);
                    }
                    else if(q_result == []){
                        return callback(null, null);
                    }
                    else {
                        console.log(q_result[0])
                        return callback(null, q_result[0])
                    }
                })
            }
        })
    },

    showallProducts: function (callback) {
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
                        assignment.product AS p 
                        INNER JOIN category ON p.category_id = category.categoryid
                    ORDER BY
                        category.categoryid ASC
                `;

                dbConn.query(sql, [], (error, q_result) => {
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
                            return callback(null, q_result);
                        }

                    }
                })
            }
        })
    },

    distinctProductBrands: function (callback) {
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
                    SELECT DISTINCT
                        brand
                    FROM
                        assignment.product
                `;

                dbConn.query(sql, [], (error, q_result) => {
                    dbConn.end();

                    if (error) {
                        console.log("query error");
                        console.log(error);
                        return callback(error, null);
                    }
                    else if(q_result.length == 0){
                        return callback(null, null);
                    }
                    else {
                        console.log(q_result);
                        return callback(null, q_result);
                    }
                })
            }
        })
    },

    searchByBrandandName: function (search, callback) {

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
                        product
                    WHERE
                        brand LIKE "%${search.e_brand}%" OR
                        name LIKE "%${search.e_contents}%";
                `;

                dbConn.query(sql, [], (error, q_result) => {
                    dbConn.end();

                    if (error) {
                        console.log("query error");
                        console.log(error);
                        return callback(error, null);
                    }
                    else if(q_result.length == 0){
                        console.log(q_result);
                        return callback(null, null);
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

// ===============================
// export
// ===============================
module.exports = Product;