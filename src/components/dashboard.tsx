import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth-context"
import { BookOpen, Calendar, TrendingUp, UserPen, List, Replace, FilePlus2, SquarePen } from "lucide-react";

function Dashboard() {
    const { fullName, roles } = useAuth();

    return (
        <div className="page-div">
            <div className="dashboard-greeting">
                <h2 >Hi, {fullName} 👋</h2>
                <p className="text-sm sm:text-base mt-2 opacity-90">
                    We’re glad to have you back! Explore your courses, manage your content, or check your progress.
                </p>
            </div>
            <div className="dashboard">
                {roles.includes("Student") && <Link to="/my-courses"><div className="card h3"><BookOpen />Enrolled Courses</div></Link>}
                {roles.includes("Student") && <div className="card h3"><Calendar />Upcoming Lessons</div>}
                {roles.includes("Student") && <div className="card h3"><TrendingUp />Progress Report</div>}
                {roles.includes("Admin") && <Link to="/users"><div className="card h3"><UserPen />Manage Users</div></Link>}
                {roles.includes("Admin") && <Link to="/course-list"><div className="card h3"><List />Course List</div></Link>}
                {roles.includes("Admin") && <div className="card h3"><Replace />Reassign Course</div>}
                {roles.includes("Instructor") && <Link to="/add-course"><div className="card h3"><FilePlus2 />Add Course</div></Link>}
                {roles.includes("Instructor") && <Link to="/course-list"><div className="card h3"><SquarePen />Manage Course</div></Link>}
                {roles.includes("Instructor") && <Link to="/course-list"><div className="card h3"><List />Course List</div></Link>}
            </div>
        </div>
    )
}

export default Dashboard;