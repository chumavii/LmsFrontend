
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from './contexts/auth-context';
import LoginForm from './components/login-form';
import PrivateRoute from './components/private-route';
import Layout from './components/layout.tsx';
import CourseList from "./components/course-list";
import Dashboard from "./components/dashboard.tsx";
import Users from "./components/users.tsx";
import SignupForm from "./components/signup-form.tsx";
import Unauthorized from "./components/unauthorized.tsx";
import Settings from "./components/settings.tsx";
import MyCourses from "./components/my-courses.tsx";
import AddCourse from "./components/add-course.tsx";

function App() {
  const { login } = useAuth(); // This is from your AuthContext

  const handleLoginSuccess = (token: string) => {
    login(token);
  };

  const generalRoles : string[] = ["Admin", "Instructor", "Student"];
  const instructorRole : string[] = ["Instructor"];
  const studentRole : string[] = ["Student"];
  const adminRole : string[] = ["Admin"];

  return (
    <Router>
        <Routes>
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route element={<PrivateRoute allowedRoles={generalRoles}><Layout /></PrivateRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/course-list" element={<CourseList />} />
            <Route path="/add-course" element={<PrivateRoute allowedRoles={instructorRole}><AddCourse /></PrivateRoute>} />
            <Route path="/my-courses" element={<PrivateRoute allowedRoles={studentRole}><MyCourses /></PrivateRoute>} />
            <Route path="/users" element={<PrivateRoute allowedRoles={adminRole}><Users /></PrivateRoute>} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>
        </Routes>
    </Router>
  );
}


export default App
