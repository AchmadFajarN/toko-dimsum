import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { Outlet } from "react-router"
import './homeLayout.css'
import { AuthProvider } from "../../provider/authProvider"

const HomeLayout = () => {
  return (
    <>
    <AuthProvider>
      <Header />
      <main className="main">
          <Outlet />
      </main>
      <Footer />
    </AuthProvider>
    </>
  )
}

export default HomeLayout