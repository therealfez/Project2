var db = require("../models");
// var sources = require("../data/sources");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });
  app.get("/home", function(req, res) {
    // validation feature
    // var search = "100percentfedup.com";

    // for(var i = 0; i < sources.length; i++) {
    //   // loop thru object
    //   for (var property in object) {
    //     if (object.hasOwnProperty(property)) {
    //       // Do things here
    //     }
    //   }
    // }
    // first attempt
    // Object.keys(sources).forEach(function(key) {
    //   // if(key)
    //   var keyTwo = sources[key];
    //   for (i in keyTwo) {
    //     if (i === search) {
    //       // console.log(i);
    //       Object.keys(keyTwo).forEach(function(subkey) {
    //         // subkey = website name
    //         console.log(subkey);
    //       });
    //     }
    //   }
    // });
    // $(".input").on("click", function(event){
    //   var userSiteSearch = $("#search").val().trim();
    // search threw
    // })
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("home", {
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
