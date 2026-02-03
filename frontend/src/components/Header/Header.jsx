import './header.css';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth'; 

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [scroll, setScroll] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const onScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = [
    {
      name: "home",
      path: '/'
    },
    {
      name: "product",
      path: '/products'
    },
  ]
  return (
      <header className={`${ !scroll && pathname === '/' ? 'header' : 'header-scroll' }`}>
        <h1 className='header-heading'>Dimsum kawai</h1>
        <nav className='header-nav'>
          <ul className='header-nav-ul'>
            {
              nav.map((n, i) => {
                return (
                  <li key={i} className='header-nav-ul-li'>
                    <Link className={` ${ !scroll && pathname === '/' ? 'header-nav-ul-li-a' : 'header-nav-ul-li-a-scroll' } `} to={n.path} >{ n.name }</Link>
                  </li>
                )
              })
            }
            { 
              isAuthenticated ? 
              <>
                <li className='header-nav-ul-li'>
                  <Link className={ `${ !scroll && pathname === '/' ? 'header-nav-ul-li-a' : 'header-nav-ul-li-a-scroll' }` }  to={'/dashboard-user'}>{ user.username } </Link> 
                </li>
                <li onClick={logout} className='header-nav-ul-li'><button className='btn btn-logout'>Logout</button></li> 
              </>
              : <li className='header-nav-ul-li'>
                <Link className={ `${ !scroll && pathname === '/' ? 'header-nav-ul-li-a' : 'header-nav-ul-li-a-scroll' }` } to={'/login'} >Login</Link>
              </li>
            }
          </ul>
        </nav>
      </header>
  )
}

export default Header