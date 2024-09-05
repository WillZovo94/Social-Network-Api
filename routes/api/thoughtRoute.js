const router = require('express').Router();

const {
    getAllThoughts,
    singleThought,
    createThought,
    updateThought,
    deleteThought,
    makeReaction,
    deleteReaction,
} = require('../../controllers/thoughtsController.js');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(singleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(makeReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;