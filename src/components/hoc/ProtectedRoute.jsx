import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export function ProtectedRoute ({ element }) {
  const { isAuthenticated } = useSelector(store => store.user)
  const location = useLocation()

  return isAuthenticated ? element : <Navigate to='/login' state={{ from: location }} replace />
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired
}