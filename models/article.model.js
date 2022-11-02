const moogoose = require('mongoose');

//Define a schema
const Schema = moogoose.Schema;

//Define article schema
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tags: {
        type: [String]
    },
    author: {
        type: String
    },
    state: {
        type: String,
        enum: ['Draft', 'Published'],
        default: 'Draft'
    },
    read_count: {
        type: Number
    },
    reading_time: {
        type: Number
    },
    body : {
        type: String,
        required: true
    },
    timestamp : {
        type: Date,
        default: Date.now
    }
});

ArticleSchema.index({ title: 1, author: 1 }, { unique: true });


const ArticleModel = moogoose.model('Articles', ArticleSchema);
module.exports = ArticleModel;