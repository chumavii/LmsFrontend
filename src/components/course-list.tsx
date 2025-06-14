import { useEffect, useState } from "react";
import { type Course, getCourses } from '../services/api';

export default function CourseList() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCourses()
            .then(setCourses)
            .catch(err => setError(err.message));
    }, []);

    if (error)
        return <p>Error: {error}</p>;

    return (
        <div className="p-4">

            <h1 className="text-2xl font-bold text-center mb-6">Learning Management System</h1>
            <h2 className="text-xl font-bold mb-4">Courses</h2>
            <ul className="space-y-3">
                {courses.map(course => (
                    <li key={course.id} className="border p-4 rounded shadow">
                        <h3 className="font-semibold">{course.title}</h3>
                        <p>{course.description}</p>
                        <p>
                            Instructor: {course.instructorName}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}