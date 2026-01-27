const express = require("express");
const router = express.Router();

const {
  startGithubAuth,
  githubCallback
} = require("../controllers/githubAuthController");

router.get("/github", startGithubAuth);
router.get("/github/callback", githubCallback);

module.exports = router;