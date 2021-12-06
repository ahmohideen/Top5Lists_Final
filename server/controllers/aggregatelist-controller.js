const AggregateList = require('../models/aggregatelist-model');

createAggregateList = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Aggregate List',
        })
    }

    const aggregateList = new AggregateList(body);
    console.log("creating aggregateList: " + JSON.stringify(aggregateList));
    if (!aggregateList) {
        return res.status(400).json({ success: false, error: err })
    }

    aggregateList
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                top5List: aggregateList,
                message: 'Aggregate List Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Aggregate List Not Created!'
            })
        })
}




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

updateAggregateList = async (req, res) => {
    console.log("we're at update aggregate list")
    const body = req.body
    console.log("updateAggregateList: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    const aggregateList = await AggregateList.findOne({ _id: req.params.id })
    if(!aggregateList){
        return res.status(404).json({
            err,
            message: 'Aggregate List not found!',
        })
    }
    console.log("aggregateList found: " + JSON.stringify(aggregateList));
    console.log("BODY", body);
        aggregateList.name = body.name
        aggregateList.items = body.items
        if(body.likes){
            aggregateList.likes = body.likes
        }
        if(body.dislike){
            aggregateList.dislike = body.dislike
        }
        if(body.views){
            aggregateList.views = body.views
        }
        if(body.comments){
            aggregateList.comments = body.comments
        }

        
        aggregateList
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: aggregateList._id,
                    message: 'Aggregate List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Aggregate List not updated!',
                })
            })
        
}


module.exports = {
    createAggregateList,
    getAggregateLists,
    updateAggregateList
}