const AggregateList = require('../models/aggregatelist-model');

getAggregateLists = async (req, res) => {
    await AggregateList.find({}, (err, aggregateLists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!aggregateLists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Aggregate Lists not found` })
        }
        return res.status(200).json({ success: true, data: aggregateLists })
    }).catch(err => console.log(err))
}

module.exports = {
    getAggregateLists
}