import { asyncFunction } from '../../../../global/hooks/utils/asyncFunction'
import { Cookie } from '../../../infrastructure/cookie/Cookie'
import { updateUser } from '../../../infrastructure/store/global-store'
import { Token } from '../../../domain/models/auth/Token'
import { useNavigate } from 'react-router-dom'
import { User } from '../../../domain/models/auth/User'
import { userIntanceRepository } from '../../../infrastructure/connection/instances/auth/UserIntanceRepository'
import { userService } from '../../../domain/services/auth/UserService'
import jwt from 'jwt-decode'
import useFetchAndLoad from '../../../../global/hooks/useFetchAndLoad'
import { useEffect } from 'react'

const useAuthViewModel = () => {
  const navigate = useNavigate()

  const userIstance = userService(userIntanceRepository)

  const { callEndpoint: callUser, loading: loadingAuth } = useFetchAndLoad()

  const callAuthUserWithFunction = ({ email, password }) => {
    const callUserRequest = () => callUser(userIstance.getTokenUser<Token>({ email, password }))
    asyncFunction<Token>(callUserRequest, adaptaAuth)
  }

  const adaptaAuth = (responseAuth: Token) => {
    Cookie.setToken(responseAuth.access_token)
    const user: User = jwt(responseAuth.access_token)
    updateUser(user)
    sendToAdminPage()
  }
  const onFinishForm = ({ email, password }) => {
    callAuthUserWithFunction({ email, password })
  }

  const sendToAdminPage = () => {
    navigate('/user-admin', { replace: true })
  }

  return { onFinishForm, loadingAuth }
}

export default useAuthViewModel
