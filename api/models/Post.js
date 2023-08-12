const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        max: 30,
    },
    img: {
        type: String,
    },
    likes: {
        type: Array,
        default: [],
    },
    img64: {
        type: String,
    },
    audio64:{
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);