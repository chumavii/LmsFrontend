import Nav from "./nav";
import LeftNav from "./left-nav";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function Layout() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleLinkClick = () => {
        // Close sidebar on mobile when a link is clicked
        if (isNavOpen) setIsNavOpen(false);
    };

    return (
        <div className="layout">
            <div className={`left-pane md:translate-x-0 ${isNavOpen ? "translate-x-0" : "translate-x-[-100%]"}`}>
                <LeftNav onLinkClick={handleLinkClick} />
            </div>
            {/* Overlay */}
            {isNavOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsNavOpen(false)}
                />
            )}
            <div className="right-pane">
                <Nav onMenuClick={() => setIsNavOpen(!isNavOpen)} />
                <main className="overflow-y-auto flex-1">
                    <Outlet />
                </main>
                <footer className="footer">
                    &copy; {new Date().getFullYear()} Upskeel. All rights reserved.
                </footer>
            </div>
        </div>
    )
}

export default Layout;
