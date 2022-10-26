const router = require('express').Router();

const {
    getThoughts,
    thoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    createReaction,
    removeReaction
} = require('../../controllers/thoughts-controller')

// to fetch and render posts and make them
router.route('/')
    .get(getThoughts)
    .post(createThoughts)

// to fetch and delete items by id
router.route('/:id')
    .get(thoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);

// create reations and delete them
router.route('/:thoughtsId/reactions')
    .post(createReaction)

router.route('/:thoughtsId/reaction/reactionId')
    .delete(removeReaction)
    
module.exports = router;