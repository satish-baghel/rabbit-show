import { useEffect } from 'react'

// import withRouter from "../Common/withRouter"

import { useSelector } from "react-redux"
import { Container } from "reactstrap"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"
// import { ToastContainer } from 'react-toastify';
import { Toast } from '../../Atoms'
// redux

const Layout = (props) => {
  const { leftSideBarTheme } = useSelector(state => ({
    isPreloader: state.Layout.isPreloader,
    leftSideBarType: state.Layout.leftSideBarType,
    layoutModeType: state.Layout.layoutModeType,
    layoutWidth: state.Layout.layoutWidth,
    topbarTheme: state.Layout.topbarTheme,
    sidebarSizeType: state.Layout.sidebarSizeType,
    showRightSidebar: state.Layout.showRightSidebar,
    leftSideBarTheme: state.Layout.leftSideBarTheme,
  }))

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Header />
      <Toast />
      
      {/* <ToastContainer /> */}
      <Sidebar
        theme={leftSideBarTheme}
        // type={leftSideBarType}
        isMobile={isMobile}
      />
      <div className="main-content">
        <div className="page-content">

          <Container fluid>{props.children}</Container>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
