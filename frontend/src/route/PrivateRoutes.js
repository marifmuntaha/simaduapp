import { Route, Navigate } from 'react-router-dom'
import { APICore } from '../utils/api/APICore'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const api = new APICore()

    return (
        <Route
            {...rest}
            render={(props) => {
                if (api.isUserAuthenticated() === false) {
                    return (
                        <Navigate
                            to={{
                                pathname: '/auth/masuk',
                            }}
                        />
                    )
                }
                return <Component {...props} />
            }}
        />
    )
}

export default PrivateRoute
