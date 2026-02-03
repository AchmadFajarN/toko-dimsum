import './sidebar.css';


const Sidebar = () => {
  const nav = [
    {
      name: 'home',
      path: '/dashboard'
    },
    {
      name: 'user',
      path: '/dashboard/users'
    },
    {
      name: 'order',
      path: '/dashboard/orders'
    }
  ]
  return (
    <aside className="aside">
        <h1>Admin Panel</h1>
        <nav className="aside-nav">
          <ul className="aside-nav-ul">
            {
              nav.map((n, i) => <li className="aside-nav-ul-li" key={i}>{  n.name }</li>)
            }
            <li className='aside-nav-ul-li'>Logout</li>
          </ul>
        </nav>
    </aside>
  )
}

export default Sidebar