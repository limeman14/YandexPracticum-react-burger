import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { ROUTES } from '../../utils/app-routes'

export function ProtectedRoute ({ element }) {
  const { isAuthenticated } = useSelector(store => store.user)
  const location = useLocation()

  return isAuthenticated ? element : <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired
}