
import './App.css'
import { useState } from 'react';
import CourseList from './components/course-list';
import LoginForm from './components/login-form';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center mb-6">Learning Management System</h1>
      {loggedIn ? <CourseList /> : <LoginForm onLoginSuccess={() => setLoggedIn(true)} />}
    </div>
  );
}

export default App
