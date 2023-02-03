const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();
require('./startup/frontend')(app);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});

module.exports = server
