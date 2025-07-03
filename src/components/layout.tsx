import "./course-list"
import Nav from "./navbar";
import LeftNav from "./left-nav";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="layout">
            <div className="left-pane">
                <LeftNav />
            </div>
            <div className="right-pane">
                <Nav />
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout;