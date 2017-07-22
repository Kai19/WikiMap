"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

router.get("/", (req, res) => {
  knex('categories').select('id','name').then((resultArray) => {
    let listsOfResults = {};
    resultArray.forEach((row) =>{
      listsOfResults[row.id] = row.name;
    })

    knex('markers').select().where('categories_id', 1).then((resultArray) => {
        let listsOfMarkers = {};
        resultArray.forEach((row) =>{
          listsOfMarkers['id'] = row.id;
          listsOfMarkers['users'] = row.users_id;
          listsOfMarkers['categories'] = row.categories_id;
          listsOfMarkers['lat'] = row.lat;
          listsOfMarkers['long'] = row.long;
          listsOfMarkers['title'] = row.title;
          listsOfMarkers['description'] = row.description;
        })
    const templateVars = {
      lists: listsOfResults,
      user: req.session.user_id,
      markers: listsOfMarkers
    }
    console.log(listsOfMarkers);
    res.render("index", templateVars);
    })
  })
});
  return router;
}

module.exports = createRouter;
