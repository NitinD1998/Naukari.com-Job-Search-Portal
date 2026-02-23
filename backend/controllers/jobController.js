// In-memory jobs array for immediate testing without a database
const jobs = [
    { _id: '1', title: 'Senior React Developer', company: 'Google', rating: 4.8, experience: '3-5 Yrs', salary: '20-30 Lacs PA', location: 'Bangalore/Bengaluru, Pune', desc: 'Strong experience in React.js, Redux, and modern JavaScript...', tags: ['React.js', 'Redux', 'JavaScript', 'HTML5'] },
    { _id: '2', title: 'Frontend Engineer', company: 'Microsoft', rating: 4.7, experience: '2-4 Yrs', salary: '15-25 Lacs PA', location: 'Hyderabad/Secunderabad', desc: 'We are looking for a passionate Frontend Engineer to join our team...', tags: ['React', 'TypeScript', 'CSS3', 'UI/UX'] },
    { _id: '3', title: 'Full Stack Developer', company: 'Amazon', rating: 4.5, experience: '4-8 Yrs', salary: 'Not disclosed', location: 'Remote', desc: 'Experience in building scalable web applications using React and Node.js...', tags: ['React', 'Node.js', 'MongoDB', 'AWS'] },
];

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
    try {
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Public
const createJob = async (req, res) => {
    try {
        const { title, company, experience, salary, location, desc, tags } = req.body;

        if (!title || !company || !experience || !location || !desc) {
            return res.status(400).json({ message: 'Please add all required fields' });
        }

        const newJob = {
            _id: Date.now().toString(),
            title,
            company,
            rating: 0,
            experience,
            salary: salary || 'Not disclosed',
            location,
            desc,
            tags: tags || []
        };

        // Add to the START of the array so it shows up first
        jobs.unshift(newJob);

        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getJobs,
    createJob
};
