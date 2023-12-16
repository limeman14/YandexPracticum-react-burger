import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { ROUTES } from '../../utils/app-routes'
import { FC, PropsWithChildren } from "react";

export const ProtectedRoute: FC<PropsWithChildren<{}>> = ({ children: element }) => {
  const { isAuthenticated } = useSelector((store: any) => store.user)
  const location = useLocation()

  return isAuthenticated ? <>{element}</> : <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
}