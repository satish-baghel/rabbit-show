import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import _ from 'lodash'

import { userRoutes } from '../../routes/allRoutes'
import { BreadcrumbItem } from 'reactstrap'

const AppBreadcrumb = () => {
    const param = useParams()
    const newParam = _.invert(param)

    //
    // splitting path and replace params values
    const path = useLocation()
        ?.pathname?.split('/')
        ?.map((p) => {
            if (newParam[p]) {
                return `:${newParam[p]}`
            }
            return p
        })

    // route name
    const getRouteName = (pathname, routes) => {
        const currentRoute = routes.find((route) => route.path === pathname)
        return currentRoute ? currentRoute.name : false
    }

    // BreedCrumb
    const getBreadcrumbs = (location) => {
        const breadcrumbs = []
        location.reduce((prev, curr, index, array) => {
            const currentPathname = `${prev}/${curr}`
            const routeName = getRouteName(currentPathname, userRoutes)
            const redirectPath = currentPathname
                .split('/')
                .map((q) => (param[q.replace(':', '')] ? param[q.replace(':', '')] : q))
                .join('/')
            if (routeName) {
                breadcrumbs.push({
                    id: index,
                    pathname: currentPathname,
                    redirectPath,
                    name: routeName,
                    active: index + 1 === array.length
                })
            }

            return currentPathname
        })
        return breadcrumbs
    }

    const breadcrumbs = getBreadcrumbs(path)
    return (
        <div className='page-title-right'>
            <ol className='breadcrumb m-0'>
                {breadcrumbs.map((b) => (
                    <BreadcrumbItem active={b?.active} key={b?.id}>
                        <Link to={b.redirectPath}>{b?.name}</Link>
                    </BreadcrumbItem>
                ))}
            </ol>
        </div>
    )
}

export default React.memo(AppBreadcrumb)
