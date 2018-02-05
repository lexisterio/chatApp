const express = require('express');
//Need to use the router that comes with express
const router = express.Router();
const path = require('path');


//Use router.get to use its software

router.get('/users', (req, res) => { //This is a route, it is where the user navigates to our web page, in this case the home page/root
  res.sendFile(path.resolve(__dirname, '../views/users.html'))
});

module.exports = router;
