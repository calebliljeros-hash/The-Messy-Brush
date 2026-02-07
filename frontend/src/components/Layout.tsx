import { Outlet } from "react-router-dom"
import Footer from "./Footer"

const Layout = () => (
  <>
    <Outlet /> {/* Render current route here */}
    <Footer />
  </>
)

export default Layout
