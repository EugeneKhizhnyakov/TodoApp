const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    title: {type: String, required: true},
    owner:{type: Types.ObjectId, ref: 'User'},
    todos:[{type: Types.ObjectId, ref: 'Todo'}]
})

module.exports = model('TodoList', schema)