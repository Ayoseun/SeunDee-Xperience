import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usImage from '../assets/Us.jpeg';

const WelcomeScreen = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      navigate('/home');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white/50" style={{ backgroundImage: `url(${usImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>
      <div className="relative z-10 text-center p-6 rounded-lg max-w-md w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">SEUNDEE XPERIENCE</h1>
        <p className="text-xl md:text-2xl text-white mb-8">Come celebrate our joy</p>
        <form onSubmit={handleNameSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 rounded-lg border border-white bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-olive-600 to-magenta-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default WelcomeScreen;
