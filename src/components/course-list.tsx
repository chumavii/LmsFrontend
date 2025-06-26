import { useEffect, useState } from "react";
import { type Course, getCourses } from '../services/api';

function CourseList() {
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
        <div className="p-6">
            <h2 className="text-xl font-medium mb-4">Courses</h2>
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

export default CourseList;