const router = require('express').Router();

const {
    allUsers,
    userById,
    createUser,
    updateUser,
    deleteUser,
    friendList
} = require('../../controllers/user-controller');

// fetch all users and post user creation
router.route('/')
    .get(allUsers)
    .posy(createUser);

// fetch by id and delete by id
router.route('/:id')
    .get(userById)
    .put(updateUser)
    .delete(deleteUser)

// add friends
router.route('/:id/friends/:friendsId')
    .post(friendList)

module.exports = router;