import { useAuth } from '../contexts/auth-context.tsx';
import { UserPen } from 'lucide-react'
import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom';

interface NavProps {
  onMenuClick: () => void;
}

function Nav({ onMenuClick }: NavProps) {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="nav">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2" onClick={onMenuClick}>
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/" className="h1">
          Upskeel
        </Link>
      </div>
      <div className='logout-button'>
        {isLoggedIn &&
          <>
            <div className='flex items-center p-2'><UserPen /></div>
            <button onClick={logout} className="btn-secondary">Logout</button>
          </>
        }
      </div>
    </div>
  );
}

export default Nav;
