const express = require("express");
const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    content: {
        type: String,
    },
    daysRemaining: {
        type: Number,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    expires: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
})


module.exports = mongoose.model("Notification", NotificationSchema);