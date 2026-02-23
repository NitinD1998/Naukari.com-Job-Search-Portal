import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Login from './pages/Login';
import Register from './pages/Register';
import Employers from './pages/Employers';
import PostJob from './pages/PostJob';
import CandidateForm from './pages/CandidateForm';
import ClientForm from './pages/ClientForm';
import CVGenerator from './pages/CVGenerator';
import AIAssistant from './components/AIAssistant';
import FeedbackForm from './pages/FeedbackForm';
import Companies from './pages/Companies';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/employers" element={<Employers />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/candidate-join" element={<CandidateForm />} />
            <Route path="/client-inquiry" element={<ClientForm />} />
            <Route path="/cv-generator" element={<CVGenerator />} />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/companies" element={<Companies />} />
          </Routes>
        </main>
        <AIAssistant />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
