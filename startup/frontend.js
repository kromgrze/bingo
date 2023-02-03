const express = require('express');
const path = require('path');

module.exports = function(app) {
    // serving the frontend
    app.use(express.static(path.join(__dirname, "../client/build")));
    app.get("*", function (_, res) {
        res.sendFile(
            path.join(__dirname, "../client/build/index.html"),
            function (err) {
                res.status(500).send(err);
            }
        )
    })
}
