const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AggregateListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        itemVotes: { type: [Number], required: true },
        likes: { type: [String], required: true },
        dislike: { type: [String], required: true },
        views: { type: Number, required: true },
        comments: { type: [Schema.Types.Mixed], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('AggregateList', AggregateListSchema)
