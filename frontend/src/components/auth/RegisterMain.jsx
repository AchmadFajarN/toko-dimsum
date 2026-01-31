import './auth.css'
import { Link } from 'react-router'
const RegisterMain = () => {
  return (
     <div className='login-container'>
        <form className='form'>
            <div>
                <h1>Register</h1>
                <p>Silahkan daftar untuk membeli dimsum</p>
            </div>
            <div>
                <label htmlFor="username">username</label>
                <input type="text" id="username" className="input-username" />
            </div>
            <div>
                <label htmlFor='email'>email</label>
                <input type="text" id="email" className="input-password" />
            </div>
            <div>
                <label htmlFor='password'>password</label>
                <input type="text" id="password" className="input-password" />
            </div>
            <div>
                <label htmlFor='password'>password</label>
                <input type="text" id="password" className="input-password" />
            </div>
            <button className='btn btn-auth'>Register</button>
            <p>Sudah punya akun? <Link to={'/login'}>Login</Link></p>
        </form>
    </div>
  )
}

export default RegisterMain