const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: { type: String, required: true },
        userName: { type: String, required: true },
        published: { type: Boolean, required: true },
        likes: { type: [String], required: true },
        dislike: { type: [String], required: true },
        views: { type: Number, required: true },
        comments: { type: [Schema.Types.Mixed], required: true },
        // random: { type: String, required: false}
        // published: { type: Boolean, required: false},
        // views: { type: Integer, required: false },
        // publishedDate: { type: Date, required: false }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
