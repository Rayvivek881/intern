const Router = require('express').Router();
const { ObjectId } = require("mongodb");

const getEvent = async (req, res) => {
    try {
        const collection = database.collection('event');
        const result = await collection.findOne({ _id : ObjectId(req.query.id) });
        if (!result) {
            return res.status(200).json({msg : "problem"});
        }
        res.status(200).json(result)
    } catch (e) {
        res.status(400).json({ msg : "something went wrong" })
    }
}

const createEvent = async (req, res) => {
    try {
        const collection = database.collection('event');
        const insertData = await collection.insertOne({ ...req.body });
        res.status(200).json({ ...insertData });
    } catch (e) {
        res.status(400).json({ msg : "something went wrong" })
    }
}

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params, collection = database.collection('event');
        const result = await collection.findOneAndDelete({ _id : ObjectId(req.params.id) });
        res.status(200).json({ ...result, msg : "document deleted" })
    } catch (e) {
        res.status(400).json({ msg : "something went wrong" })
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params, collection = database.collection('event');
        const result = await collection.findOneAndUpdate({ _id : ObjectId(req.params.id) }, {
            $set : {
                ...req.body
            }
        });
        res.status(200).json({ ...result, msg : "document updated" });
    } catch (e) {
        res.status(400).json({ msg : "something went wrong" })
    }
}

Router.route('/event')
    .post(createEvent)
    .get(getEvent)
Router.route('/event/:id')
    .delete(deleteEvent)
    .put(updatePost)
    
module.exports = Router;