const express = require("express");
const router = express.Router();

// Import Middlerwares
const { auth } = require("../middlerwares/auth");

const {createComplaint, getComplaints} = require("../controllers/complaints");

// Import Controllers
router.post("/create", auth, createComplaint);
router.get("/get", auth, getComplaints);

// Export router
module.exports = router;




