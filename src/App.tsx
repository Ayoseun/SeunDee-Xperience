import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RSVPPage from './pages/RSVPPage'
import CameraPage from './pages/CameraPage';
import BlockchainPage from './pages/BlockchainPage';
import GalleryPage from './pages/GalleryPage';
import WelcomeScreen from './pages/WelcomeScreen';
import { useState } from 'react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen setPhoneNumber={setPhoneNumber}
          setName={setName}
          name={name}
          phone={phoneNumber}
        />} />
        <Route path="/home" element={<HomePage
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          name={name} />} />
        <Route path="/rsvp" element={<RSVPPage
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          name={name} />} />
        <Route path="/camera" element={<CameraPage darkMode={darkMode}
          setDarkMode={setDarkMode}
          name={name} />} />
        <Route path="/blockchain" element={<BlockchainPage darkMode={darkMode}
          setDarkMode={setDarkMode}
          phoneNumber={phoneNumber} 
          name={name} />} />
        <Route path="/gallery" element={<GalleryPage darkMode={darkMode}
          setDarkMode={setDarkMode}
          name={name} />} />
      </Routes>
    </Router>
  );
};

export default App;

