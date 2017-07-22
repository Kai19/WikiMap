"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

router.get("/edit", function (req, res) {
  let templateVars = {user: req.session.user_id};
  res.render("edit", templateVars);
});
  return router;
}

module.exports = createRouter;