import './auth.css'
import { Link } from 'react-router'
import useRegister from '../../hooks/useRegister'
const RegisterMain = () => {
  const { field, submitHandler, onUsernameChange, onPasswordChange, onEmailChange, error, onRepeatPasswordChange, loading } = useRegister();
  const { username, password, email, repeatPassword } = field;
  return (
     <div className='login-container'>
        <form onSubmit={submitHandler} className='form'>
            {
                error?.status && <div className='form-error-message'>
                    <p>{ error.message }</p>
                </div>
            }
            <div>
                <h1>Register</h1>
                <p>Silahkan daftar untuk membeli dimsum</p>
            </div>
            <div>
                <label htmlFor="username">username</label>
                <input value={username} onChange={onUsernameChange} type="text" id="username" className="input-username" />
            </div>
            <div>
                <label htmlFor='email'>email</label>
                <input value={email} onChange={onEmailChange} type="text" id="email" className="input-password" />
            </div>
            <div>
                <label htmlFor='password'>password</label>
                <input onChange={onPasswordChange} value={password} type="text" id="password" className="input-password" />
            </div>
            <div>
                <label htmlFor='password'>ulangi password</label>
                <input onChange={onRepeatPasswordChange} value={repeatPassword} type="text" id="password" className="input-password" />
            </div>
            <button disabled={ loading } className={`${ loading ? 'btn-loading' : 'btn' } btn-auth`}>Register</button>
            <p>Sudah punya akun? <Link to={'/login'}>Login</Link></p>
        </form>
    </div>
  )
}

export default RegisterMain