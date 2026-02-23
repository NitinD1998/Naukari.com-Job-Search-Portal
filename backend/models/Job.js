const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a job title']
    },
    company: {
        type: String,
        required: [true, 'Please add a company name']
    },
    rating: {
        type: Number,
        default: 0
    },
    experience: {
        type: String,
        required: [true, 'Please add experience required']
    },
    salary: {
        type: String,
        default: 'Not disclosed'
    },
    location: {
        type: String,
        required: [true, 'Please add location']
    },
    desc: {
        type: String,
        required: [true, 'Please add a description']
    },
    tags: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Job', jobSchema);
