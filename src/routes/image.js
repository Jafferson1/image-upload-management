const express = require("express");
const router = express.Router();
const fs = require("fs-extra");
const conn = require("../db/conn");
const _path = require("path");
const mw = require("../middlewares/images_mw");

router.post("/multiple/:type/:id_user", (req, res) => {
  try {
    mw.multiple(req, res, (err) => {
      if (err) {
        console.log("ERR -> " + err);
        return res.end("Something went wrong!");
      }
      return res.end("Images uploaded sucessfully!");
    });
  } catch (err) {
    console.log("error...");
  }
});

router.post("/single/:type/:id_user", async (req, res) => {
  try {
    mw.single(req, res, (err) => {
      if (err) {
        console.log("ERR -> " + err);
        return res.end("Something went wrong!");
      }
      return res.end("Image uploaded sucessfully!.");
    });
  } catch (err) {
    console.log("error...");
  }
});

router.post("/edit/:type/:id_user/:id", async (req, res) => {
  try {
    mw.edit(req, res, (err) => {
      if (err) {
        console.log("ERR -> " + err);
        return res.end("Something went wrong!");
      }
      return res.end("Files uploaded sucessfully!.");
    });
  } catch (err) {
    console.log("error...");
  }
});

router.delete("/remove/:id", async (req, res) => {
  try {
    let img = await conn
      .knex("images_path")
      .where({ id: req.params.id })
      .then((r) => {
        return r[0];
      });
    if (typeof img == "undefined" || img.length == 0) {
      return res.statu(500).json({ msg: "Image not found" });
    }
    let p = _path.join(__dirname, "../../public/" + img.path);
    fs.unlink(p, async (err) => {
      if (err) throw err;
      await conn.knex("images_path").where({ id: req.params.id }).del();
      return res.status(200).json({ msg: "successfully deleted" });
    });
  } catch (err) {
    console.log("error...");
  }
});

module.exports = router;
