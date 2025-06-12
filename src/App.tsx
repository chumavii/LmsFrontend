
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './components/login-form';
import PrivateRoute from './components/private-route';
import { useAuth } from './contexts/auth-context';
import Dashboard from './components/dashboard';


function App() {
  const { login } = useAuth(); // This is from your AuthContext

  const handleLoginSuccess = (token: string) => {
    login(token);
  };

  return (
    <Router>
        <Routes>
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/" element={
              <PrivateRoute>
                  <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
    </Router>
  );
}


export default App
