const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a company name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: String,
        default: '0'
    },
    type: {
        type: String,
        required: [true, 'Please add company type (e.g., Product, Service)']
    },
    icon: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Company', companySchema);
