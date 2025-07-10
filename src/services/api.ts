const BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface Course {
    id: number;
    title: string;
    name: string;
    description: string;
    instructorName: string;
}

export interface User {
    fullName: string;
    email: string;
    roles: string;
}

export async function getCourses(): Promise<Course[]> {
    const response = await fetch(`${BASE_URL}/courses`);
    if (!response.ok)
        throw new Error('Failed to fetch courses');

    return await response.json();
}

export async function getUsers(): Promise<User[]> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/auth/users`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("Failed to fetch users");

    return await response.json();
}