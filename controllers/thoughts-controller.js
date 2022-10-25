const {Thoughts} = require('../models');

const thoughtsController = {
    // fetching all of the thoughts
    getThoughts(req, res) {
        Thoughts.find({})
    },
    // fetch thoughts by id
    thoughtsById({params}, res) {

    },
    // creating a new thought
    createThoughts({body},res) {

    },
    // update by id
    updateThoughts({params,body}, res) {

    },
    // delete thought by id
    deleteThoughts({params}, res) {

    },
    // create a rection and store it in a thought
    createReaction({ params, body}, res) {

    },
    //remove the reation by id
    removeReaction({params}, res) {
        
    }
}

module.exports = thoughtsController;