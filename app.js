const express = require('express');
const app = express();

const port = process.env.PORT || 1337;;

app.get('/', (req, res) => {
    res.send("<h1>This is my first Express App</h1>");
})

app.listen(port, ()=> {
    console.log(`The application started successfully on port ${port}`);
})