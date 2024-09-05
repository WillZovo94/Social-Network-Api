const router = require('express').Router()
const {
    getAllUsers,
    singleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    delFriend
} = require('../../controllers/usersController.js')

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(singleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends').post(addFriend);

router.route('/:userId/friends/:friendId').delete(delFriend);

module.exports = router;