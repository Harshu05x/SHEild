const express = require("express");
const router = express.Router();

// Import Middlerwares
const { auth } = require("../middlerwares/auth");

// Import Controllers
const { updateProfile, getProfile, markAsRead } = require("../controllers/User");


// ----------------------------------- [ Profile routes ] --------------------------------------------------
router.post("/update", auth, updateProfile);
router.get("/", auth, getProfile);
router.post("/markAsRead", auth, markAsRead);

// Export router
module.exports = router;
