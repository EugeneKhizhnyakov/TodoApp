const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    title: {type: String, required: true},
    completed: {type: Boolean, default: false},
    owner:{type: Types.ObjectId, ref: 'TodoList'}
})

module.exports = model('Todo', schema)