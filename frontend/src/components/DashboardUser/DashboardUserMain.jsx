import './dashboardUser.css'
import { useAuth } from '../../hooks/useAuth';
import { useOrderUser } from '../../hooks/useOrder';
import Table from './Table';

const DashboardUserMain = () => {
  const { orders } = useOrderUser();
  const { user } = useAuth();
  return (
    <div className='dashboard-user-main'>
        <h1 className='dashboar-user-main-heading'>{ user?.username } </h1>
        <Table data={orders} />
    </div>
  )
}

export default DashboardUserMain