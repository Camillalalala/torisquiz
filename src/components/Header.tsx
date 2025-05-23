import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Home className="h-6 w-6 text-[#640A09] mr-2" />
              <span className="text-xl font-semibold text-[#640A09]">Toriquiz</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <Link to="/" className="text-[#640A09] hover:text-gray-600 px-3 py-2 rounded-md text-lg font-medium">
              Home
            </Link>
            <Link to="/quiz" className="text-[#640A09] hover:text-gray-600 px-3 py-2 rounded-md text-lg font-medium">
              Quiz
            </Link>
            <Link to="/stories" className="text-[#640A09] hover:text-gray-600 px-3 py-2 rounded-md text-lg font-medium">
              Success Stories
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
