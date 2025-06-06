const BASE_URL = 'https://localhost:8081/api';

export interface Course {
    id: number;
    title: string;
    name: string;
    description: string;
    instructorName: string;
}

export async function getCourses(): Promise<Course[]> {
    const response = await fetch(`${BASE_URL}/courses`);
    if(!response.ok)
        throw new Error('Failed to fetch courses');

    return await response.json();
}