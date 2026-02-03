import './auth.css'
import { Link } from 'react-router'
import { useLogin } from '../../hooks/useLogin'
const LoginMain = () => {
  const { field, onSubmitHandler, onUsernameChange, onPasswordChange } = useLogin()
  return (
    <div className='login-container'>
        <form onSubmit={onSubmitHandler} className='form'>
            <div>
                <h1>Login</h1>
                <p>Silahkan login untuk membeli dimsum</p>
            </div>
            <div>
                <label htmlFor="username">username</label>
                <input value={field.username} onChange={onUsernameChange} type="text" id="username" className="input-username" />
            </div>
            <div>
                <label htmlFor='password'>password</label>
                <input value={field.password} onChange={onPasswordChange} type="text" id="password" className="input-password" />
            </div>
            <button className='btn btn-auth'>Login</button>
            <p>Belum punya akun? <Link to={'/register'}>Register</Link></p>
        </form>
    </div>
  )
}

export default LoginMain