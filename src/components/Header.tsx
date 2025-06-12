import { CloudSun, Moon, Star, } from 'lucide-react';


interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  tokens: number;
  userName: string;
}

const Header = ({ setDarkMode, darkMode, tokens, userName }: HeaderProps) => {


  const textClass = darkMode ? 'text-white' : 'text-white';
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'bg-black/95' : 'bg-[#777723]'} backdrop-blur-sm border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} px-4 md:px-6 py-2 sticky top-0 z-20`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div>
            <h1 className={`text-lg md:text-xl font-bold ${textClass}`}>
              💕 {userName}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gold-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-all`}
          >
            {darkMode ? <CloudSun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className="bg-gradient-to-r from-green-500 to-[green-900] rounded-full px-3 py-1 shadow-sm">
            <div className="flex items-center space-x-1 text-white">
              <Star className="w-4 h-4" />
              <span className="font-bold text-sm md:text-base">{tokens}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
