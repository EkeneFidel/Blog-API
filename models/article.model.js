const moogoose = require("mongoose");

//Define a schema
const Schema = moogoose.Schema;

//Define article schema
const articleSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        tags: {
            type: [String],
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "Users",
        },
        state: {
            type: String,
            enum: ["Draft", "Published"],
            default: "Draft",
        },
        read_count: {
            type: Number,
            default:0
        },
        reading_time: {
            type: Number,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

articleSchema.index({ title: 1, author: 1 }, { unique: true });

const articleModel = moogoose.model("Articles", articleSchema);
module.exports = articleModel;
