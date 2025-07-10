import { useAuth } from '../contexts/auth-context.tsx';
import {UserPen} from 'lucide-react'

function Nav() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="nav">
      <h1>Upskeel</h1>
      <div className='logout-button'>
        {isLoggedIn 
          && <><div className='flex items-center p-2'><UserPen/></div> <button onClick={logout} className="btn-secondary">Logout</button></>}
      </div>
    </div>
  );
}

export default Nav;
