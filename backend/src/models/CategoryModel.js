const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema(
    {
        nameType: { type: String, required: true },
        image: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;