import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import {jwtDecode} from "jwt-decode";

interface AuthContextType {
    token: string | null;
    isLoggedIn: boolean;
    roles: string[];
    fullName: string | null;
    login: (token: string) => void;
    logout: () => void;
    isInRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    isLoggedIn: false,
    roles: [],
    fullName: null,
    login: () => { },
    logout: () => { },
    isInRole: () => false
});

interface Props {
    children: ReactNode;
}

interface JwtPayload {
    role: string[] | string;
    [key: string]: any;
}

export function AuthProvider({ children }: Props) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const [roles, setRoles] = useState<string[]>([]);
    const [fullName, setFullName] = useState<string | null>(null);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                const roleClaim = decoded.role;
                setRoles(Array.isArray(roleClaim) ? roleClaim : [roleClaim]);
                setFullName(decoded.FullName || null);
            } catch {
                setRoles([]);
            }
        } else {
            setRoles([]);
        }
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

    return(
        <AuthContext.Provider value={{token, isLoggedIn: !!token, roles, fullName, login, logout, isInRole}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}