import { useState } from "react";
import { authAction } from "../utils/action/auth";
import { useNavigate } from "react-router";

const useRegister = () => {
    const navigate = useNavigate()
    const [field, setField] = useState({
        username: '',
        password: '',
        repeatPassword: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        status: false
    });

    const submitHandler = async(e) => {
        e.preventDefault();
        setLoading(true)
        if (field.password !== field.repeatPassword) {
            setError({
                status: true,
                message: 'password harus sama'
            });
            setLoading(false);
            return;
        }

        await authAction(field, setLoading, setError, navigate)
    }

    const onUsernameChange = (e) => {
        setField((prev) => {
            return {
                ...prev,
                username: e.target.value
            }
        })
    }

    const onPasswordChange = (e) => {
        setField((prev) => {
            return {
                ...prev,
                password: e.target.value
            }
        });
    }

    const onEmailChange = (e) => {
        setField((prev) => {
            return {
                ...prev,
                email: e.target.value
            }
        })
    }

    const onRepeatPasswordChange = (e) => {
        setField((prev) => {
            return {
                ...prev,
                repeatPassword: e.target.value
            }
        })
    }

    return { 
        field, 
        error, 
        loading, 
        submitHandler, 
        onUsernameChange, 
        onPasswordChange,
        onEmailChange,
        onRepeatPasswordChange
    }
}
export default useRegister;