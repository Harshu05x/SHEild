const express = require("express");
const router = express.Router();

const { login, getStatistics, getComplaints, updateStatus, getComplaintById } = require("../controllers/Police");

router.post("/login", login);
router.get("/statistics", getStatistics);
router.get("/complaints", getComplaints);
router.post("/update-status", updateStatus);
router.get("/complaint", getComplaintById);

module.exports = router;
