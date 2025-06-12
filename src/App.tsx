import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RSVPPage from './pages/RsvpPage'
import CameraPage from './pages/CameraPage';
import BlockchainPage from './pages/BlockchainPage';
import GalleryPage from './pages/GalleryPage';
import WelcomeScreen from './pages/WelcomeScreen';
import { useState } from 'react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/home" element={<HomePage darkMode={darkMode}
          setDarkMode={setDarkMode} />} />
        <Route path="/rsvp" element={<RSVPPage 
        darkMode={darkMode}
          setDarkMode={setDarkMode} />} />
        <Route path="/camera" element={<CameraPage darkMode={darkMode}
          setDarkMode={setDarkMode} />} />
        <Route path="/blockchain" element={<BlockchainPage darkMode={darkMode}
          setDarkMode={setDarkMode} />} />
        <Route path="/gallery" element={<GalleryPage darkMode={darkMode}
          setDarkMode={setDarkMode} />} />
      </Routes>
    </Router>
  );
};

export default App;

