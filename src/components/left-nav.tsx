import { NavLink } from "react-router-dom";
import { Home, List, FilePlus2, BookOpen, Users, Settings } from "lucide-react";
import { useAuth } from "../contexts/auth-context";


function LeftNav() {
    const {roles} = useAuth();

    const menuItems = [
        {name: "Dashboard", path: "/", icon: <Home/>},
        {name: "Courses", path: "/course-list", icon: <List />},        
        ...(roles.includes("Instructor") ? [
            {name: "Add Course", path: "/add-course", icon: <FilePlus2 />},
        ] : []),
        ...(roles.includes("Student") ? [
            {name: "My Courses", path: "/my-courses", icon: <BookOpen />},
        ] : []),
        ...(roles.includes("Admin") ? [
            {name: "Users", path: "/users", icon: <Users />},
        ] : []),
        {name: "Settings", path: "/settings", icon: <Settings />}
    ];

    return (
        <>
            <div><img src="/logo.PNG" className="logo"/></div>
            <nav className="left-nav">
                {menuItems.map((item) => (
                    <NavLink key={item.path} to={item.path} className={({isActive}) => isActive ? "left-nav-link-active" : "left-nav-link"}>
                        {item.icon} 
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </>
    )
}

export default LeftNav;