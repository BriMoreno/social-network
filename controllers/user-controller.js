const {User} = require('../models');

const userController = {
    // fetch all users
    allUsers(req, res) {
        User.find({})
            .populate({
                path:'thoughts',
                select:'-__V'
            })
            .select('-__v')
            .sort({_id: -1})
            .then(userData => res.json(userData))
            .catch(err => {
                console.log("Cannot get all users");
                res.status(404).json(err)
            });
    },
    // fetch user by id
    userById({ params }, res) {
        User.findOne({_id: params.id})
            .populate({
                path: 'thoughts',
                select:'-__v'
            })
            .select('-__v')
            .then(userData => {
                if(!userData) {
                    res.status(404).json({message: 'No user has this Id'});
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log('Unable to complete action');
                res.status(400).json(err);
            });
    },
    // create user
    createUser({body}, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },
    // making updates to the user by id
    updateUser ({ params, body}, res) {
        User.findOneAndUpate({_id: params.id}, body, {new: true, runValidators: true})
        .then(userData => {
            if(!userData){
            res.status(404).json({message:'No user has this Id'});
            return;
        }
        res.json(userData);
    })
    .catch(err => res.status(400).json(err));
    },
    // deleting user thoughts by id
    deleteThought({ params }, res){
        User.findOneAndDelete({_id: params.id})
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user has this Id'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },
    //get friendlist and add friends to the user profile
    friendList({params}, res) {
        User.findOneAndUpate({
            id_: params.id
        
        },
            {$push: {friends: params.friendsId}},
            {new:true},
        )
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;