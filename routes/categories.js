"use strict";

const express = require("express");

function createRouter(knex) {
  const router = express.Router();

  router.post("/", function (req, res) {
    const categoriesChecker = knex("categories")
      .select(1)
      .where({ name: req.body.categories })
      .limit(1);

    categoriesChecker.then((rows) => {
      if (rows.length) {
        return Promise.reject({
          type: 409,
          message: `${req.body.categories} category already exists`
        });
      }
      return knex('categories').insert({
        name: req.body.categories
      });
    }).then(() => {
      return knex("categories")
        .select('id', 'name')
        .where({ name: req.body.categories })
        .limit(1)
    }).then((categories) => {
      res.redirect(`/?categories=${categories[0].id}`);
    }).catch((err) => {
      req.flash('errors', err.message);
      res.redirect("/");
    });
  });

  return router;
}

module.exports = createRouter;
