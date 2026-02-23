// In-memory companies array for immediate testing without a database
const companies = [
    { _id: '1', name: 'Google', rating: 4.8, reviews: '3.2K+', type: 'Product', icon: 'G' },
    { _id: '2', name: 'Microsoft', rating: 4.7, reviews: '5.1K+', type: 'Product', icon: 'M' },
    { _id: '3', name: 'TCS', rating: 4.1, reviews: '25.4K+', type: 'Service', icon: 'T' },
    { _id: '4', name: 'Amazon', rating: 4.5, reviews: '12.8K+', type: 'Product', icon: 'A' },
    { _id: '5', name: 'Infosys', rating: 4.0, reviews: '20.1K+', type: 'Service', icon: 'I' },
    { _id: '6', name: 'Accenture', rating: 4.2, reviews: '18.5K+', type: 'Service', icon: 'Ac' },
];

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
const getCompanies = async (req, res) => {
    try {
        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCompanies,
};
