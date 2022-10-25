const {Thoughts} = require('../models');

const thoughtsController = {

    // fetching all of the thoughts
    getThoughts(req, res) {
        Thoughts.find({})
        .select('-__v')
        .sort({_id: -1})
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log('Error')
            res.status(400).json(err)
        });
    },

    // fetch thoughts by id
    thoughtsById({params}, res) {
        Thoughts.findOne({_id:params.id})
        .select('-__v')
        .then(thoughtsData => {
            if(thoughtsData) {
                res.status(404).json({ message:'No thought has this ID'});
                return;
            }
            res.json(thoughtsData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // creating a new thought
    createThoughts({body},res) {
        Thoughts.create(body)
        .then(thoughtsData => res.json(thoughtsData))
        .catch(err => res.status(400).json(err));

    },

    // update by id
    updateThoughts({params,body}, res) {
        Thoughts.findOneAndUpdate({_id: params.id}, body, { new: true, runValidators: true})
        .then(thoughtsData => {
            if(!thoughtData) {
                res.status(404).json({message: 'No thought has this ID.'});
                return;
            }
            res.json(thoughtsData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete thought by id
    deleteThoughts({params}, res) {
        Thoughts.findOneAndDelete({_id: params.id})
        .then(thoughtsData => {
            if(!thoughtsData){
                res.status(404).json({message: 'No thought has this ID'});
                return;
            }
            res.json(thoughtsData);
        })
        .catch(err => res.status(400).json(err));
    },
    // create a rection and store it in a thought
    createReaction({ params, body}, res) {
        Thoughts.findOneAndUpdate(
            {_id: params.thoughtsId},
            { $push: { reactions:body} },
            { new: true, reunValidators: true}
        )
        .then(thoughtsData => {
            if (!thoughtsData) {
                res.status(500).json({message:'No thought has this ID'});
                return;
            }
            res.json(thoughtData)
        })
        .catch(err => res.json(err))
    },
    //remove the reation by id
    removeReaction({params}, res) {
        Thoughts.findOne(
            {_id: params.thoughtId},
        )
        .then(thoughtsData => {
            thoughtsData.reactions.pull(params.reactionId)
            return thoughtsData.save();
        })
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.json(err));
    }
}

module.exports = thoughtsController;