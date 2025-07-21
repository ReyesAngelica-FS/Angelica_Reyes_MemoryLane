// server/models/KnitModel.js
const mongoose = require("mongoose");

const KnittingProjectSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: true,
        trim: true,
    },
    yarn_type: {
        type: String,
        required: true,
        trim: true,
    },
    pattern_name: {
        type: String,
        required: true,
        trim: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

// Export model
module.exports = mongoose.model("KnittingProject", KnittingProjectSchema);
