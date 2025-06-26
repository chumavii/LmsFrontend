
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from './contexts/auth-context';
import LoginForm from './components/login-form';
import PrivateRoute from './components/private-route';
import Layout from './components/layout.tsx';
import CourseList from "./components/course-list";
import Dashboard from "./components/dashboard.tsx";
import Users from "./components/users.tsx";
import SignupForm from "./components/signup-form.tsx";

function App() {
  const { login } = useAuth(); // This is from your AuthContext

  const handleLoginSuccess = (token: string) => {
    login(token);
  };

  return (
    <Router>
        <Routes>
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="course-list" element={<CourseList />} />
            <Route path="users" element={<Users />} />
            <Route path="signup" element={<SignupForm />} />
          </Route>
        </Routes>
    </Router>
  );
}


export default App
