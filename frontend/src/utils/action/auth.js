import { register, login } from "../api/auth";


export const authAction = async(data, setLoading, setError, navigate) => {
    const result = await register(data);
    console.log(result);
    
    if (result.success) {
        navigate('/login')  
    } else {
        setError({
            status: true,
            message: 'username sudah terdaftar'
        })
    }
    
    setLoading(false);
}

export const loginAction = async(data, setLoading, setError, navigate) => {
    
}