import "./dashboardLayout.css";
import { AuthProvider } from "../../provider/authProvider";
import { Outlet } from "react-router";
import ProtectedNonAdmin from "../../components/dashboardHome/ProtctedRouteAdmin";

const DashboardLayout = () => {
  return (
    <AuthProvider>
      <ProtectedNonAdmin>
        <Outlet />
      </ProtectedNonAdmin>
    </AuthProvider>
  );
};

export default DashboardLayout;
