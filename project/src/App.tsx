import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Demo from './pages/Demo';
import Partners from './pages/Partners';
import About from './pages/About';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
