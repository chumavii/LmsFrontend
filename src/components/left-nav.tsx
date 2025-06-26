import { NavLink } from "react-router-dom";
import { Home, BookOpen, Users, Settings } from "lucide-react";



function LeftNav() {
    const menuItems = [
        {name: "Dashboard", path: "/", icon: <Home/>},
        {name: "Courses", path: "/course-list", icon: <BookOpen />},
        {name: "Users", path: "/users", icon: <Users />},
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