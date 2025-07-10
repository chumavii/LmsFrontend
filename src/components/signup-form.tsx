import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

function SignUpForm() {
    const [fullName, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [passwordTwo, setPasswordTwo] = useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')

        try{
            if(password != passwordTwo) 
                return setError('Passwords do not match')

            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({email, fullName, password, role}),
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data[0].description) 
            }
            
            navigate("/login");
        }
        catch(err: any) {
            setError(err.message);
        }
    }

    return (
        <div className="form-div">
            <form onSubmit={handleSubmit} className="form">
                <h2 className="h2">Sign Up</h2>
                {error && <p className="text-xs pb-2 text-red-600">{error}</p>}
                <p className="input-title">Full Name</p>
                <input
                    type="text"
                    value={fullName}
                    onChange={e => setName(e.target.value)}
                    required
                    className="text-input"
                />
                <p className="input-title">Email</p>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="text-input"
                />
                <p className="input-title">Role</p>
                <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    required
                    className="text-input"
                >
                    <option value="">Select role</option>
                    <option value="Student">Student</option>
                    <option value="Instructor">Instructor</option>
                </select>
                {role === "Instructor" && (<p className="text-xs text-yellow-600 pb-2"> Instructor accounts require admin approval before login is granted.</p>)}
                <p className="input-title">Password</p>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="text-input"
                />
                <p className="input-title">Confirm Password</p>
                <input
                    type="password"
                    value={passwordTwo}
                    onChange={e => setPasswordTwo(e.target.value)}
                    required
                    className="text-input"
                />
                <button type="submit" className="btn-primary">Sign Up</button>
                <div className='text-xs p-6 text-center'>
                    <p>Already have an account? <Link to="/login" className='underline text-blue-400'>Login</Link></p>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm;