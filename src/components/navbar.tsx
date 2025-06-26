import { useAuth } from '../contexts/auth-context.tsx';

function Nav() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="nav">
      <h1>Learnify</h1>
      <div className='logout-button'>
        {isLoggedIn && (
          <button onClick={logout} className="btn-secondary">
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Nav;
