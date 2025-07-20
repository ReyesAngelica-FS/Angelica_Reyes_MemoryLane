// server/models/KnitModels.js
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
        required: false,
        trim: true,
    },
    progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    notes: {
        type: String,
        trim: true,
        default: ""
    },
    dateStarted: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("KnittingProject", KnittingProjectSchema);
