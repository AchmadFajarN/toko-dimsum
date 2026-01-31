import './auth.css'
import { Link } from 'react-router'
const LoginMain = () => {
  return (
    <div className='login-container'>
        <form className='form'>
            <div>
                <h1>Login</h1>
                <p>Silahkan login untuk membeli dimsum</p>
            </div>
            <div>
                <label htmlFor="username">username</label>
                <input type="text" id="username" className="input-username" />
            </div>
            <div>
                <label htmlFor='password'>password</label>
                <input type="text" id="password" className="input-password" />
            </div>
            <button className='btn btn-auth'>Login</button>
            <p>Belum punya akun? <Link to={'/register'}>Register</Link></p>
        </form>
    </div>
  )
}

export default LoginMain