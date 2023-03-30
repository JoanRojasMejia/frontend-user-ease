import { Navigate, Outlet } from 'react-router-dom'

export const AuthGuard = ({ user }) => {
  return user ? <Outlet /> : <Navigate replace to={'login'} />
}

export default AuthGuard