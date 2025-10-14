const express = require("express");
const router = express.Router();
const {
  authorize,
  handleGoogleCallback,
} = require("../controllers/googleController");

// Redireciona para a tela de consentimento do Google
router.get("/auth", authorize);

// O Google redireciona para cá após o consentimento
router.get("/callback", handleGoogleCallback);

module.exports = router;
