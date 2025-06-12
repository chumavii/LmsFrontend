import { useAuth } from '../contexts/auth-context.tsx';

function Nav() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="Nav">
      {isLoggedIn && (
        <button 
          onClick={logout}
          className="bg-[#1f3349]  hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Nav;
