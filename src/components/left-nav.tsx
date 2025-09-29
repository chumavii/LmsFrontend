import { NavLink } from "react-router-dom";
import { Home, List, FilePlus2, BookOpen, Users, Settings } from "lucide-react";
import { useAuth } from "../contexts/auth-context";

interface LeftNavProps {
    onLinkClick: () => void;
};


function LeftNav({ onLinkClick }: LeftNavProps) {
    const { roles } = useAuth();

    const menuItems = [
        { name: "Dashboard", path: "/", icon: <Home /> },
        { name: "Courses", path: "/course-list", icon: <List /> },
        ...(roles.includes("Instructor") ? [{ name: "Add Course", path: "/add-course", icon: <FilePlus2 /> },] : []),
        ...(roles.includes("Student") ? [{ name: "My Courses", path: "/my-courses", icon: <BookOpen /> },] : []),
        ...(roles.includes("Admin") ? [{ name: "Users", path: "/users", icon: <Users /> },] : []),
        { name: "Settings", path: "/settings", icon: <Settings /> }
    ];

    return (
        <>
            <div className="flex flex-col h-full overflow-y-auto">
                <div className="flex-shrink-0">
                    <img src="/logo.PNG" className="logo" />
                </div>
                <nav className="left-nav">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => isActive ? "left-nav-link-active" : "left-nav-link"}
                            onClick={onLinkClick}
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    )
}

export default LeftNav;