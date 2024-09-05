const router = require('express').Router()
const {
    getAllUsers,
    singleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/usersController')

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(singleUser).post(updateUser).delete(deleteUser)

module.exports = router;