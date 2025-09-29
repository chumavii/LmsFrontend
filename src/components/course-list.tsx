import { useEffect, useState } from "react";
import { type Course, getCourses } from '../services/api';
import { Loader2, AlertCircle } from "lucide-react";

function CourseList() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCourses()
            .then((data) => setCourses(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
                <span className="ml-2 text-gray-500">Loading courses...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
            </div>
        );
    }

    return (
        <div className="p-8 text-gray-700">
            <h2 className="text-2xl font-bold mb-6">Courses</h2>
            {courses.length === 0 ? (
                <p className="text-gray-500">No courses available.</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {courses.map((course) => (
                        <li
                            key={course.id}
                            className="card flex flex-col justify-start items-start text-left p-4 sm:p-6 hover:shadow-xl transition-shadow"
                        >
                            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                            <p className="text-sm font-medium text-gray-700">Instructor: {course.instructorName}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CourseList;
