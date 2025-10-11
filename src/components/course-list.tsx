import { useAuth } from '../contexts/auth-context.tsx';
import { useEffect, useState } from "react";
import { type Course, getCourses, getMyEnrollments } from '../services/api';
import { Loader2, AlertCircle, User as UserIcon } from "lucide-react";
import EnrollButton from "./enroll-button";

function CourseList() {
  const { roles } = useAuth(); // get roles directly from auth context
  const isStudent = roles.includes("Student");

  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await getCourses();
        setCourses(coursesData);
        setFilteredCourses(coursesData);

        if (isStudent) {
          const myEnrollments = await getMyEnrollments();
          setEnrolledCourseIds(myEnrollments.map(e => e.courseId));
        }
      } catch (err: any) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isStudent]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredCourses(courses);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredCourses(
        courses.filter(
          c =>
            c.title.toLowerCase().includes(term) ||
            c.instructorName.toLowerCase().includes(term)
        )
      );
    }
  }, [searchTerm, courses]);

  if (loading) return (
    <div className="flex justify-center items-center py-10">
      <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
      <span className="ml-2 text-gray-500">Loading courses...</span>
    </div>
  );

  if (error) return (
    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
      <AlertCircle className="w-5 h-5" />
      <span>{error}</span>
    </div>
  );

  return (
    <div className="page-div">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#4e8ccf]">Courses</h2>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="text-input w-64"
        />
      </div>

      {filteredCourses.length === 0 ? (
        <p className="text-gray-500">No courses found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredCourses.map(course => {
            const isEnrolled = enrolledCourseIds.includes(course.id);

            return (
              <li key={course.id} className="card flex flex-col justify-start items-start text-left p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                <p className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-1">
                  <UserIcon className="w-4 h-4 text-[#f97316]" />
                  {course.instructorName}
                </p>

                {isStudent && (
                  isEnrolled ? (
                    <button
                      disabled
                      className="btn-disabled cursor-not-allowed bg-gray-400 text-white p-2 rounded-md"
                    >
                      Enrolled
                    </button>
                  ) : (
                    <EnrollButton
                      courseId={course.id}
                      onSuccess={() => setEnrolledCourseIds([...enrolledCourseIds, course.id])}
                    />
                  )
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CourseList;
