import "./course-list"
import CourseList from "./course-list";
import Nav from "./navbar";

function Dashboard() {
    return (
        <div className="dashboard">
            <div className="left-pane">
                
            </div>
            <div className="right-pane">
                <Nav />
                <CourseList />
            </div>
        </div>
    )
}

export default Dashboard;