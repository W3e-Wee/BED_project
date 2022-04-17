//--------------------------------
// imports
//--------------------------------
const app = require("./controller/app");

// --------------------------------
// configs
// --------------------------------
const hostname = 'localhost';
const port = 3000;

// --------------------------------
// main
// --------------------------------
app.listen(port, hostname, () => {
    console.log(`Server started and accessible via http://${hostname}:${port}/`);
  });