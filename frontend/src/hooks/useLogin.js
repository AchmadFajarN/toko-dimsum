import { useAuthContext } from "../context/authContext";
import { useState } from "react";
import { login } from "../utils/api/auth";
import { useNavigate } from "react-router";

export const useLogin = () => {
    const navigate = useNavigate();
    const [field, setField] = useState({
        username: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const context = useAuthContext();

    if (!context) {
        throw new Error('useAuth harus digunakan di dalam authProvider');
    }

    const { login: loginContext } = context;

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        setLoading(true)
        const result = await login(field);
        console.log(result);

        if (!result.success) {
            setError(true)
        }

        if (result.success && result.data.user.role !== 'admin') {
            
            const data = result.data;
            loginContext({
                user: data.user,
                accessToken: data.accessToken,
            });
            
            navigate('/products');
        } else {
            const data = result.data;
            loginContext({
                user: data.user,
                accessToken: data.accessToken,
            });
            navigate('/dashboard')
        }
        setLoading(false);
    }

    const onUsernameChange = (e) => {
        setField((prev) => {
            return {
                ...prev,
                username: e.target.value
            }
        });
    }

    const onPasswordChange = (e) => {
        setField((prev) => {
            return {
                ...prev,
                password: e.target.value
            }
        })
    }

    return { field, onUsernameChange, onPasswordChange, onSubmitHandler, loading, error };
}