const router = require('express').Router()
const {
    getAllUsers,
    singleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    delFriend
} = require('../../controllers/usersController')

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(singleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(delFriend);

module.exports = router;