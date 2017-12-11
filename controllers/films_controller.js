var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var film = require("../models/film.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  film.all(function(data) {
    var hbsObject = {
      films: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/films", function(req, res) {
  film.create([
    "name", "watched"
  ], [
    req.body.name, req.body.watched
  ], function(result) {
    
    res.json({ id: result.insertId });
  });
});

router.put("/api/films/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  film.update({
    watched: req.body.watched
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/films/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  film.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
