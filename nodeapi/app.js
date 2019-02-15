const express = require('express');
const app = express();
const morgan = require("morgan");

// routes
const { getPosts } = require('./routes/post');

//middleware
app.use(morgan("dev"));

app.get("/", getPosts);

const port = 8080;
app.listen(port, () => {
    console.log(`Node Api is listening on port ${port}`)
});
