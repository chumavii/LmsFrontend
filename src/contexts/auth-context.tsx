import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    token: string | null;
    isLoggedIn: boolean;
    roles: string[];
    fullName: string | null;
    authChecked: boolean;
    login: (token: string) => void;
    logout: () => void;
    isInRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    isLoggedIn: false,
    roles: [],
    fullName: null,
    authChecked: false,
    login: () => { },
    logout: () => { },
    isInRole: () => false,
});

interface Props {
    children: ReactNode;
}

interface JwtPayload {
    [key: string]: any;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
}

export function AuthProvider({ children }: Props) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const [roles, setRoles] = useState<string[]>([]);
    const [authChecked, setAuthChecked] = useState(false);
    const [fullName, setFullName] = useState<string | null>(null);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                const parsedRoles = Array.isArray(roleClaim) ? roleClaim : typeof roleClaim === "string" ? [roleClaim] : [];
                setRoles(parsedRoles);
                setFullName(decoded.FullName || null);
            } catch {
                setRoles([]);
            }
        } else {
            setRoles([]);
        }
        setAuthChecked(true);
    }, [token]);

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setRoles([])
    };

    const isInRole = (role: string) => roles.includes(role);

    return (
        <AuthContext.Provider value={{ token, isLoggedIn: !!token, roles, fullName, login, logout, isInRole, authChecked }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}