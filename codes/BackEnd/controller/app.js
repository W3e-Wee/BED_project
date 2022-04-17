/* 
    Requirements: 
        - Login / Logout
        - Able to serach by product name or brand
        - View specific product detail
        - add review (MEMBER)
        - add category preferences (MEMBER)
            > contains checkboxes for user to select hsi category
        - add new product (ADMIN)
            > page to enter all fields to add a product
            > NOTE: frontend should allow admins to select category name (from checkboxes above)
                    but inserts category id
        - add new category (ADMIN)
            > error message to show failed insertion



Base Endpoints to do:
    1. User login [Done]
    2. Add Product [Done]
    3. Add Category [Done]
    4. Add Interest [Done]
    5. Add Review [Done]
    6. Show all reviews [Working...]
    7. View product by ID [Working...]
    8. Search product by brand/name [Working...]
    9. Category interest [Working...]
    10. View Categories by ID [Working...]

Advance Endpoints:


*/


// ================================
// imports
// ================================

// Express import
const express = require("express");
const app = express();
const cors = require('cors');

// import body-parser
const bodyParser = require("body-parser");

// import jsonwebtoken & secret key
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

// import models
const User = require("../model/user");
const Category = require("../model/category");
const Product = require("../model/product");
const Review = require("../model/review");
const Interest = require("../model/interest");

// import verification
const verifyToken = require("../auth/verifyToken");

// ================================
// configs
// ================================
let urlEncoderParser = bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json();

// ================================
// MF configs
// ===============================
app.use(urlEncoderParser);
app.use(jsonParser);
app.use(cors());

// ================================
// Endpoints
// ================================

// --------------------------------
// Users
// --------------------------------

// USER LOGIN [DONE]
// http://localhost:3000/login
app.post('/login', (req, res) => {

    let data = {
        "e_username": req.body.username,
        "e_password": req.body.password
    };

    User.verify(data, (err, result) => {
        if (err) {
            let errMsg = {
                message: "An error occured..."
            };

            res.status(500).type('json').send(errMsg.message).end();
        }
        else if (result == null) {
            let errMsg = {
                message: "Invalid login credentials!"
            };

            res.status(401).type('json').send(errMsg.message).end();
        }
        else {
            console.log(result);

            let payload = {
                id: result.id,
                role: result.type
            };

            let tokenConfig = {
                expiresIn: 86400,
                algorithm: "HS256"
            }

            jwt.sign(payload, JWT_SECRET, tokenConfig, (error, token) => {
                if (error) {
                    console.log(error);

                    let errMsg = {
                        message: "An error occured..."
                    };

                    res.status(401).type("json").send(errMsg.message).end();
                }
                else {
                    res.status(200).send({
                        token: token,
                        user_id: result.id,
                        role: result.type
                    })
                }
            })

        }
    })

});

// GET USER BY ID [DONE]
// http://localhost:3000/users/3
app.get('/users/:id', (req, res) => {
    // extraction
    let id = parseInt(req.params.id);
    
    // processing request and giving response
    User.findUserByID(id, (err, result) => {
        if(err){
            let errResponse = {
                "message": "Oops! An error occured"
            }
            res.status(500).type('json').send(errResponse.message).end();
        }
        else {
            if(result){
                res.status(200).type('json').send(result).end();
            }
            else {
                res.status(404).type('json').send("No such user!").end();
            }

        }
    })
})

// ADD USER [DONE]
// http://localhost:3000/users/
app.post('/users', (req, res) => {

    // extracting request body
    let data = { 
        "d_username": req.body.username,
        "d_email": req.body.email,
        "d_password": req.body.password,
        "d_contact": parseInt(req.body.contact),
    };

    // processing request and giving response
    User.addUser(data, (err, result) => {
        if(err){
            if(err.code == 'ER_DUP_ENTRY') {
                res.status(422).type('json').send("Duplicate entry!").end();
            }
            else {
                let errResponse = {
                    "message": "Oops! An error occured"
                }
                res.status(500).type('json').send(errResponse.message).end();
            }
        }
        else {
            let successResponse = {
                "userid": result.insertId
            }
            res.status(201).type('json').send(successResponse).end();
        }
    })
});

// EDIT USER [DONE]
// http://localhost:3000/users/2/
app.put('/users/:id', (req, res) => {

    // extraction
    let id = parseInt(req.params.id);

    let data = { 
        "d_username": req.body.username,
        "d_email": req.body.email,
        "d_password": req.body.password,
        "d_contact": parseInt(req.body.contact),
        "d_type": req.body.type,
        "d_profile_pic_url": req.body.profile_pic_url
    };

    // processing request and giving response
    User.editUser(id, data, (err, result) => {
        if(err){
            let errResponse = {
                "message": "Oops! An error occured"
            }
            res.status(500).type('json').send(errResponse.message).end();
        }
        else {
            if(result.changedRows == 0 ) {
                res.status(422).type('json').send("Duplicate entry!").end();
            }
            else {
                res.status(204).type('json').end();
            }
        }
    })
})

// --------------------------------
// Category
// --------------------------------

// ONLY ADMIN
// ADD CATEGORY [DONE]
// http://localhost:3000/category
app.post('/category', verifyToken, (req, res) => {

    // authentication
    if (req.decodedToken.role != 'Admin') {
        let errMsg = {
            "message": "Invalid role! (Not a admin)"
        };

        return res.status(403).type('json').send(errMsg);
    }

    // extracting request body
    let data = {
        "e_category": req.body.category,
        "e_description": req.body.description
    };

    // processing request and giving response
    Category.addCategory(data, (err, result) => {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                res.status(422).type('json').send("Duplicate entry!").end()
            }
            else {
                let errResponse = {
                    "message": "Oops! An error occured"
                }
                res.status(500).type('json').send(errResponse.message).end();
            }
        }
        else {
            let successResponse = {
                "categoryID": result.insertId,
                "message": "Successfully created a new category!"
            }

            res.status(201).type('json').send(successResponse).end();
        }
    })
});

// GENERAL PUBLIC 
// VIEW CATEGORY [DONE]
// http://localhost:3000/category
app.get('/category', (req, res) => {
    // no extraction required

    // processing request and giving response
    Category.showAllCategories((err, result) => {
        if(err){
            let errResponse = {
                "message": "Oops! An error occured"
            }
            res.status(500).type('json').send(errResponse.message).end();
        }
        else {
            if(result){
                res.status(200).type('json').send(result).end();
            }
            else {
                res.status(400).type('json').send('No categories').end();
            }

        }
    })
});

// GENERAL PUBLIC 
// VIEW CATEGORY BY ID [Working]
// http://localhost:3000/category
app.get('/category/:catID', (req, res) => {
    // no extraction required
    const cid = parseInt(req.params.catID);

    // processing request and giving response
    Category.showCategoryByID(cid, (err, result) => {
        if(err){
            let errResponse = {
                "message": "Oops! An error occured"
            }
            res.status(500).type('json').send(errResponse.message).end();
        }
        else {
            if(result){
                res.status(200).type('json').send(result).end();
            }
            else {
                res.status(400).type('json').send('No categories').end();
            }

        }
    })
});
// --------------------------------
// Products
// --------------------------------

// ONLY ADMINS
// ADD PRODUCT [DONE]
// http://localhost:3000/product
app.post('/product', verifyToken, (req, res) => {

    // authentication
    if (req.decodedToken.role != 'Admin') {
        let errMsg = {
            "message": "Invalid role! (Not a admin)"
        };

        return res.status(403).type('json').send(errMsg);
    }

    // extracting request body
    let data = {
        "e_name": req.body.name,
        "e_brand": req.body.brand,
        "e_price": parseFloat(req.body.price),
        "e_screensize": req.body.screensize,
        "e_processor": req.body.processor,
        "e_memory": req.body.memory,
        "e_storage": req.body.storage,
        "e_os": req.body.os,
        "e_categoryid": parseInt(req.body.category_id),
        
    };

    // processing request and giving response
    Product.addProduct(data, (err, result) => {
        if (err) {
            if (err.code == 'ER_DUP_ENTRY') {
                res.status(422).type('json').send("Duplicate entry!").end();
            }
            else if (err.code == 'ER_NO_REFERENCED_ROW_2') {
                res.status(404).type('json').send("Invalid categoryID!").end();
            }
            else {
                let errResponse = {
                    "message": "Oops! An error occured"
                }
                res.status(500).type('json').send(errResponse.message).end();
            }
        }
        else {
            let successResponse = {
                "productid": result.insertId,
                "message": "Successfully added new product!"
            }
            res.status(201).type('json').send(successResponse).end();
        }
    })
});


// GENERAL PUBLIC
// SHOW PRODUCT BY CAT ID [DONE]
// http://localhost:3000/product/1
app.get('/product/:cid', (req, res) => {
    // extraction
    let cid = parseInt(req.params.cid);
    
    // processing request and giving response
    Product.showProductByCatID(cid, (err, result) => {
        if(err){
            let errResponse = {
                "message": "An error occured..."
            }
            res.status(500).type('json').send(errResponse.message).end();
        }
        else {
            if(result){
                res.status(200).type('json').send(result).end();
            }
            else{
                res.status(404).type('json').send("Product not found!").end();
            }
            
        }
    })
})

// GENERAL PUBLIC
// SHOW PRODUCT BY PRODUCT ID [DONE]
// http://localhost:3000/product/3
app.get('/product/view/:pid', (req, res) => {
    // extraction
    let pid = parseInt(req.params.pid);
    
    // processing request and giving response
    Product.showProductByID(pid, (err, result) => {
        if(err){
            let errResponse = {
                "message": "An error occured..."
            }
            res.status(500).type('json').send(errResponse.message).end();
        }
        else {
            if(result){
                res.status(200).type('json').send(result).end();
            }
            else{
                res.status(404).type('json').send("No such product!").end();
            }
            
        }
    })
});

// GENERAL PUBLIC
// SHOW ALL PRODUCTS [DONE]
// http://localhost:3000/product
app.get('/product', (req, res) => {
    //  no extraction required
    
    // processing request and giving response
    Product.showallProducts((err, result) => {
        if(err){
            let errResponse = {
                "message": "An error occured..."
            }
            res.status(500).type('json').send(errResponse.message).end();
        }
        else {
            if(result){
                res.status(200).type('json').send(result).end();
            }
            else{
                res.status(404).type('json').send("Product not found!").end();
            }
            
        }
    })
})

// GENERAL PUBLIC
// SHOW DISTINCT PRODUCT BRANDS [DONE]
// http://localhost:3000/brands
app.get('/brands', (req, res) => {
    //  no extraction required
    
    // processing request and giving response
    Product.distinctProductBrands((err, result) => {
        if(err){
            let errResponse = {
                "message": "An error occured..."
            }
            res.status(500).type('json').send(errResponse.message).end();
        }
        else {
            if(result){
                res.status(200).type('json').send(result).end();
            }
            else{
                res.status(404).type('json').send("No brands found!").end();
            }
            
        }
    })
})

// GENERAL PUBLIC
// SEARCH FOR PRODUCTS [Working]
// http://localhost:3000/product/search
app.post("/search", (req, res) => {
    // extract request body
    const data = {
        "e_brand": req.body.brand,
        "e_contents": req.body.contents
    }

    // process and response
    Product.searchByBrandandName(data, (err, result) => {
        if(err){
            console.log(err);
            let errMessage = {
                "message": "An error occurred..."
            }

            res.status(500).type('json').send(errMessage.message).end()
        }
        else if(result == null){
            res.status(404).type('json').send("No products found!").end();
        }
        else {
            res.status(200).type('json').send(result).end();
        }
    })
    
})

// --------------------------------
// Review
// --------------------------------

// REGISTERED MEMBER & ADMIN
// POST REVIEW [DONE]
// http://localhost:3000/product/1/review
app.post('/product/:id/review', verifyToken, (req, res) => {

    // extracting request body
    let pdt_id = parseInt(req.params.id)

    let data = {
        "e_userid": parseInt(req.body.userid),
        "e_rating": parseInt(req.body.rating),
        "e_review": req.body.review,
    };

    // authorization check
    // check if you are admin/registered user
    if (req.decodedToken.role != 'Member' && req.decodedToken.role != 'Admin') {
        let errMsg = {
            "message": "Unauthorized - unable to add review (Invalid role)"
        }

        return res.status(401).type('json').send(errMsg.message).end();
    }

    if(req.decodedToken.role == 'Member' && req.decodedToken.id != data.e_userid){
        let errMsg = {
            "message": "Unable to add review for others!"
        }

        return res.status(403).type('json').send(errMsg).end();
    }

    // processing request and giving response
    Review.addReview(pdt_id, data, (err, result) => {
        if (err) {
            if (err.code == 'ER_NO_REFERENCED_ROW_2') {
                res.status(404).type('json').send("Invalid User / Product ID").end();
            }
            else {
                let errResponse = {
                    "message": "Oops! An error occured"
                }
                res.status(500).type('json').send(errResponse.message).end();
            }
        }
        else {
            let successResponse = {
                "reviewid": result.insertId
            }
            res.status(201).type('json').send(successResponse).end();
        }
    })
})

app.get('/product/:id/review', (req, res) => {
    // extraction
    let pdt_id = parseInt(req.params.id);
    
    // processing request and giving response
    Review.getReviewByPdtID(pdt_id, (err, result) => {
        if(err){
            let errResponse = {
                "message": "Oops! An error occured"
            }
            res.status(500).type('json').send(errResponse.message).end();
        }
        else {
            if(result){
                res.status(200).type('json').send(result).end();
            }
            else {
                res.status(404).type('json').send("No reviews found!").end();
            }
        }
    })
})

// --------------------------------
// Interest
// --------------------------------

// REGISTERED MEMBER & ADMIN
// POST USER'S INTEREST [Done]
// http://localhost:3000/interest/2
app.post('/interest/:userid', verifyToken, (req, res) => {

    let interest = req.body.categoryid;
    console.log("This is the data: " + interest)

    // extracts only the numbers from the request body 
    // and pushes it into an array
    let data = interest.split(", ");
    console.log(data);

    // extracting request body
    let uid = parseInt(req.params.userid);

    // authorization check
    // check if you are admin/registered user
    if (req.decodedToken.role != 'Member' && req.decodedToken.role != 'Admin') {
        let errMsg = {
            "message": "Unauthorized - unable to add review (Invalid role)"
        }

        return res.status(401).type('json').send(errMsg.message).end();
    };

    if(req.decodedToken.role == 'Member' && req.decodedToken.id != uid){
        let errMsg = {
            "message": "Unable to add review for others!"
        }

        return res.status(403).type('json').send(errMsg).end();
    };

    // processing request and giving response
    Interest.addInterest(uid, data, (err, result) => {
        if(err){
            res.status(500).end();
        }
        else {
            res.status(201).end();
        }
    });
});

app.get('/interest/:userid', verifyToken, (req, res) => {

    let uid = parseInt(req.params.userid);

    // authorization check
    // check if you are admin/registered user
    if (req.decodedToken.role != 'Member' && req.decodedToken.role != 'Admin') {
        let errMsg = {
            "message": "Unauthorized - unable to show interest (Invalid role)"
        }

        return res.status(401).type('json').send(errMsg.message).end();
    };

    if(req.decodedToken.role == 'Member' && req.decodedToken.id != uid){
        let errMsg = {
            "message": "Unable to show interest for others!"
        }

        return res.status(403).type('json').send(errMsg).end();
    };

    // processing request and giving response
    Interest.showInterest(uid, (err, result) => {
        if(err){
            res.status(500).end();
        }
        else {
            res.status(200).type('json').send(result).end();
        }
    });
});

app.delete('/interest/:userid', verifyToken, (req, res) => {
    let uid = parseInt(req.params.userid);

    // authorization check
    // check if you are admin/registered user
    if (req.decodedToken.role != 'Member' && req.decodedToken.role != 'Admin') {
        let errMsg = {
            "message": "Unauthorized - unable to show interest (Invalid role)"
        }

        return res.status(401).type('json').send(errMsg.message).end();
    };

    if(req.decodedToken.role == 'Member' && req.decodedToken.id != uid){
        let errMsg = {
            "message": "Unable to show interest for others!"
        }

        return res.status(403).type('json').send(errMsg).end();
    };

    // processing request and giving response
    Interest.deleteInterest(uid, (err, result) => {
        if(err){
            res.status(500).end();
        }
        else {
            res.status(204).end();
        }
    });
})
// --------------------------------
// Search
// --------------------------------



// ================================
// export
// ================================
module.exports = app;     