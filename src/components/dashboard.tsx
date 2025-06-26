import { useAuth } from "../contexts/auth-context"

function Dashboard() {
    const { fullName } = useAuth();
    return (
        <>
            <div className="flex p-6 w-full ">
                <h2>Hi, {fullName}</h2>
            </div>
        </>
    )
}

export default Dashboard;