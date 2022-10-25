const { Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: 'Username is required'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: ceateAtVal => dateFormat(createAtVal)
    }
},
{
    ToJSON: {
        virtuals: true,
        getter: true,
    },
    id: false
})

const ThoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'thought is required',
        validate: [({ length }) => length < 280, 'The thought has to be 280 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: 'Username is required'
    },
    reactions: [ReactionSchema],
},
    {
        toJSon: {
            virtuals: true,
            getters: true
        },
        id: false
    },
);

ThoughtsSchema.virtual('reactionCount').get(function (){
    return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;
