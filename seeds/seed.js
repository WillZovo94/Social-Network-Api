const mongoose = require('mongoose');
const db = require('../config/connection');
const { User, Thought } = require('../models');

const seededUsers = [
    {
        username: 'Username1',
        email: 'username1@email.com',
    },
    {
        username: 'Username2',
        email: 'username2@email.com',
    },
];

const seededThoughts = [
    {
        username: 'Username1',
        thoughtText: 'Username1 thought',
        reactions: [
            {
                username: 'Username2',
                reactionBody: 'Interesting thoughts',
            }
        ]
    },

    {
        username: 'Username2',
        thoughtText: 'Username2 Thought',
        reactions: [
            {
                username: 'Username1',
                reactionBody: 'Cool thoughts man',
            }
        ]
    }
];

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Thought.deleteMany({});

        const seedUsers = await User.collection.insertMany(seededUsers);
        const seedThoughts = await Thought.collection.insertMany(seededThoughts);

        console.log('Users and Thoughts seeded');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})
