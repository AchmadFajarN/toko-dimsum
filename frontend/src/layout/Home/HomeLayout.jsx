import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { Outlet } from "react-router"
import './homeLayout.css'

const HomeLayout = () => {
  return (
    <>
    <Header />
    <main className="main">
        <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default HomeLayout