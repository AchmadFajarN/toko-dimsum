import { useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router";

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('accessToken');

        if (storedToken && storedUser) {
            setUser(JSON.parse(storedUser));
            setAccessToken(storedToken);
        } else {
            setUser(null);
            setAccessToken('');
        }

        setLoading(false);
    }, []);

    const login = ({ user, accessToken }) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);

        setUser(user);
        setAccessToken(accessToken);
    }

    const logout = () => {
        setUser(null);
        setAccessToken('');

        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{
            user,
            accessToken,
            isAuthenticated: !!user,
            loading,
            login,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}
