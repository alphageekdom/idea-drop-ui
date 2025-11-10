import { Link, useNavigate } from '@tanstack/react-router';
import { Lightbulb } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { logoutUser } from '@/api/auth';

const Header = () => {
  const { user, setUser, setAccessToken } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setAccessToken(null);
      setUser(null);
      navigate({ to: '/' });
    } catch (err: any) {
      console.log('Logout failed: ', err);
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2 text-gray-800">
          <Link to="/" className="flex items-center space-x-2 text-gray-800">
            <Lightbulb className="h-6 w-6 text-yellow-500" />
            <h1 className="text-2xl font-bold">IdeaDrop</h1>
          </Link>
        </div>

        <nav className="flex items-center space-x-4">
          <Link
            to="/ideas"
            className="px-3 py-2 leading-none font-medium text-gray-600 transition hover:text-gray-900"
          >
            Ideas
          </Link>

          {user && (
            <Link
              to="/ideas/new"
              className="rounded-md bg-blue-600 px-4 py-2 leading-none font-medium text-white transition hover:bg-blue-700"
            >
              + New Idea
            </Link>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-2">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-3 py-2 leading-none font-medium text-gray-600 transition hover:text-gray-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-gray-100 px-4 py-2 leading-none font-medium text-gray-800 transition hover:bg-gray-200"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="px-2 font-medium text-gray-700">
                Welcome, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="font medium cursor-pointer px-3 py-2 leading-none text-red-600 transition hover:text-red-900"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
