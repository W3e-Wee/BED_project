// ================================
// imports
// ================================

// import jwt & secret keys
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

// ================================
// main
// ================================

function verifyToken(req, res, next) {
    console.log(req.headers);

    var authHeader = req.headers.authorization;

    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        let errMsg = {
            auth: false,
            message: "Unauthorized! (No token found / Invalid token syntax)"
        }

       return res.status(401).type('json').send(JSON.stringify(errMsg));
    }
    else {
        const token = authHeader.replace("Bearer ", "");

        console.log(token);

        let tokenConfig = {
            algorithm: ["HS256"]
        };

        jwt.verify(token, JWT_SECRET, tokenConfig, (err, decoded) => {
            if (err) {
                console.log(err);
                let errMsg = {
                    auth: false,
                    message: "Unauthorized! (Invalid token)"
                }
                return res.status(401).type('json').send(JSON.stringify(errMsg.message));
            }
            else {
                req.decodedToken = decoded;

                // console.log(decoded);
                console.log(req.decodedToken)

                next();
            }
        })
    }
}

// ================================
// export
// ================================
module.exports = verifyToken;