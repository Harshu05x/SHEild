const express = require("express");
const router = express.Router();

// Import Middlerwares
const { auth } = require("../middlerwares/auth");

// Import Controllers 
const { sendOTP, signUp, login, changePassword} = require("../controllers/Auth");


// ----------------------------------- [ Authentication routes ] --------------------------------------------------
router.post("/login", login);
router.post("/signup", signUp);
router.post("/sendotp", sendOTP);


// Export router
module.exports = router;
