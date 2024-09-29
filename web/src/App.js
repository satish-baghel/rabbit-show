import PropTypes from 'prop-types'

import { Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'

// Import Routes all
import { userRoutes, PublicRoute } from './routes/allRoutes'

// Import all middleware
import AuthGuard from './routes/middleware/AuthGuard'

// layouts Format
import VerticalLayout from './components/VerticalLayout'
import NonAuthLayout from './components/NonAuthLayout/NonAuthLayout'

// Import scss
import './assets/scss/theme.scss'

const App = (props) => {
    function getLayout() {
        let layoutCls = VerticalLayout

        switch (props.layout.layoutType) {
            default:
                layoutCls = VerticalLayout
                break
        }
        return layoutCls
    }

    const Layout = getLayout()
    return (
        <Routes>
            {userRoutes.map((route) => (
                <Route
                    path={route.path}
                    element={
                        <AuthGuard>
                            <Layout>{route.component}</Layout>
                        </AuthGuard>
                    }
                    key={route?.id}
                    isAuthProtected
                    exact
                />
            ))}
            {PublicRoute.map((route) => (
                <Route
                    path={route.path}
                    element={<NonAuthLayout>{route.component}</NonAuthLayout>}
                    key={route?.id}
                    isAuthProtected={false}
                />
            ))}
        </Routes>
    )
}

App.propTypes = {
    layout: PropTypes.any
}

const mapStateToProps = (state) => ({
    layout: state.Layout
})

export default connect(mapStateToProps, null)(App)
