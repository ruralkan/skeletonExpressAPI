const mongoose = require('mongoose');
const {Schema} = mongoose;
const bookSchema = new Schema(
    {
        title: {type:String},
        author: {type:String},
        genre: {type:String},
        description: {type:String},
        read: {type:Boolean, default: false}
    });

bookSchema.methods.sayHello = function () {
    return `This is a shared function: ${this.username}`
}

module.exports = bookSchema;
