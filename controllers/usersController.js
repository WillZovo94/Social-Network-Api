const { User, Thought } = require('../models');

module.exports = {
    async getAllUsers (req, res) {
        try {
            const users = await User.find()

            res.status(200).json(users);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    async singleUser (req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).populate('thoughts friends');

            if (!user) {
                return res.status(404).json({ message: 'Unable to find that user with that ID' });
            };
    
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser (req, res) {
        try {
            const userCreate = await User.create(req.body);
            
            res.status(200).json(userCreate);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser (req, res) {
        try {
            const updateUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true },
            );

            if (!updateUser) {
                return res.status(404).json({ message: "Couldn't find user to update!" })
            };

            res.status(200).json(updateUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser (req, res) {
        try {
            const userDelete = await User.findOneAndRemove(
                { _id: req.params.userId });

                if (!userDelete) {
                    return res.status(404).json({ message: "Couldn't find that user to delete!" })
                };

                res.status(200).json({ message: `${userDelete} has been deleted!`})
        } catch (err) {
            res.status(500).json(err);
        }
    },

   async addFriend (req, res) {
        try {
            const addFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body }},
                { runValidators: true, new: true },
            );

            if (!addFriend) {
                return res.status(404).json({ message: 'Unable to find user' })
            };

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async delFriend (req, res) {
        try {
            const deleteFriend = await User.findOneAndUpdate( 
                { _id: req.params.userId },
                { $pull: {friends: req.params.friendId }},
                { runValidators: true, new: true },
            );

            if (!deleteFriend) {
                return res.status(404).json({ message: 'Unable to find user' })
            };

            res.status(200).json(deleteFriend);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}