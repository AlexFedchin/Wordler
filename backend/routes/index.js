const express = require("express");
const usersRouter = require("./users");
const wordListsRouter = require("./wordLists");

const router = express.Router();

router.use("/users", usersRouter);
router.use("/wordlists", wordListsRouter);

module.exports = router;
