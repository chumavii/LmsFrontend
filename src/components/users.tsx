import { useEffect, useState } from 'react';
import { type User, getUsers } from '../services/api';


function Users() {

    const [users, setUser] = useState<User[]>([]);
    const [error, setError] = useState<string>();

    useEffect(() => {
        getUsers()
            .then(setUser)
            .catch(err => setError(err.message))
    }, []);


    return (
        <div className='p-8 text-gray-600'>
            <h2 className="text-xl font-medium mb-4">Users</h2>
            {error && error}
            <table className='w-full text-sm '>
                <tr>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ROLES</th>
                </tr>
                {users.map(user => (
                    <tr key={user.email}>
                        <td>
                            {user.fullName}
                        </td>
                        <td>
                            {user.email}
                        </td>
                        <td>
                            {user.roles}
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Users;