const { User, Thought } = require('../models');

module.exports = {
    async getAllThoughts (req, res) {
        try {
            const allThoughts = await Thought.find();

            res.status(200).json(allThoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    async singleThought (req, res) {
        try {
            const oneThought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!oneThought) {
                res.status(500).json(err);
            };

            res.status(200).json(oneThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought (req, res) {
        try {
            const createThought = await Thought.create(req.body);

            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: createThought._id} },
                { runValidators: true, new: true },
            );

            if (!user) {
                res.status(404).json({ message: "Unable to find that user" })
            }

            res.status(200).json(createThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought (req, res) {
        try {
            const updateThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updateThought) {
                res.status(404).json({ message: 'Unable to find that thought' });
            };

            res.status(200).json(updateThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought (req, res) {
        try {
            const deleteThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!deleteThought) {
                res.status(404).json({ message: 'Unable to find that thought' });
            };

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId }},
                { runValidators: true,  new: true}
            );

            res.status(200).json(deleteThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async makeReaction (req, res) {
        try {
            const createReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: {reactions: req.body} },
                { runValidators: true, new: true },
            );

            if (!createReaction) {
                res.status(404).json({ message: 'Unable to find that thought' });
            };

            res.status(200).json(createReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction (req, res) {
        try {
            const deleteReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: {reactions: {reactionId: req.params.reactionId }}},
                { runValidators: true, new: true },
            );

            if (!deleteReaction) {
                res.status(404).json({ message: 'Unable to find that thought' });
            };

            res.status(200).json(deleteReaction);
        } catch (err) {
            res.status(500).json(err)
        }
    }

}