// server/models/KnittingProject.js
const mongoose = require("mongoose");

const KnittingProjectSchema = new mongoose.Schema({
    project_name: String,
    yarn_type: String,
    pattern_name: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("KnittingProject", KnittingProjectSchema);
