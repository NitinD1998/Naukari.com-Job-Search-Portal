const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');
const Company = require('./models/Company');

dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/naukri-clone';
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

const jobs = [
    { title: 'Senior React Developer', company: 'Google', rating: 4.8, experience: '3-5 Yrs', salary: '20-30 Lacs PA', location: 'Bangalore/Bengaluru, Pune', desc: 'Strong experience in React.js, Redux, and modern JavaScript...', tags: ['React.js', 'Redux', 'JavaScript', 'HTML5'] },
    { title: 'Frontend Engineer', company: 'Microsoft', rating: 4.7, experience: '2-4 Yrs', salary: '15-25 Lacs PA', location: 'Hyderabad/Secunderabad', desc: 'We are looking for a passionate Frontend Engineer to join our team...', tags: ['React', 'TypeScript', 'CSS3', 'UI/UX'] },
    { title: 'Full Stack Developer', company: 'Amazon', rating: 4.5, experience: '4-8 Yrs', salary: 'Not disclosed', location: 'Remote', desc: 'Experience in building scalable web applications using React and Node.js...', tags: ['React', 'Node.js', 'MongoDB', 'AWS'] },
];

const companies = [
    { name: 'Google', rating: 4.8, reviews: '3.2K+', type: 'Product', icon: 'G' },
    { name: 'Microsoft', rating: 4.7, reviews: '5.1K+', type: 'Product', icon: 'M' },
    { name: 'TCS', rating: 4.1, reviews: '25.4K+', type: 'Service', icon: 'T' },
    { name: 'Amazon', rating: 4.5, reviews: '12.8K+', type: 'Product', icon: 'A' },
    { name: 'Infosys', rating: 4.0, reviews: '20.1K+', type: 'Service', icon: 'I' },
    { name: 'Accenture', rating: 4.2, reviews: '18.5K+', type: 'Service', icon: 'Ac' },
];

const importData = async () => {
    try {
        await connectDB();

        await Job.deleteMany();
        await Company.deleteMany();

        await Job.insertMany(jobs);
        await Company.insertMany(companies);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
