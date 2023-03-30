import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { lazyMinLoadTime } from '../components/Loader/lazy-load'
import { selectorGlobalState } from '../../app/infrastructure/store/global-store'
import { Suspense } from 'react'
import AuthGuard from './guards/AuthGuard'
import Loader from '../components/Loader/Loader'

const SLEEP = 1
const LoginPage = lazyMinLoadTime(() => import('../../app/views/auth/auth.page'), SLEEP)
const AdminPage = lazyMinLoadTime(() => import('../../app/views/admin/admin.page'), SLEEP)

const MainRouter = () => {
  const user = selectorGlobalState.use.user()

  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="user-admin" />} />
          <Route
            path="login"
            element={user ? <Navigate replace to="/user-admin" /> : <LoginPage />}
          />
          <Route element={<AuthGuard user={user} />}>
            <Route path="user-admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default MainRouter
