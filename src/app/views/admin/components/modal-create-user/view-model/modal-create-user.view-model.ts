import useFetchAndLoad from '../../../../../../global/hooks/useFetchAndLoad'
import { usesrService } from '../../../../../domain/services/admin/UsersService'
import { usersIntanceRepository } from '../../../../../infrastructure/connection/instances/admin/UsersInstanceRepository'
import { asyncFunction } from '../../../../../../global/hooks/utils/asyncFunction'
import { newUser } from '../../../../../domain/models/admin/Users'

const useModalCreateUserViewModel = (closeModalCreateUser, setRefetchUsers, refetchUsers) => {
  const usersInstance = usesrService(usersIntanceRepository)

  const { callEndpoint: callCreateUser, loading: loadingCreateUser } = useFetchAndLoad()

  const createUser = (user: newUser) => {
    const callCreate = () => callCreateUser(usersInstance.saveUser(user))
    asyncFunction(callCreate, adaptResponseCreateUser)
  }

  const adaptResponseCreateUser = () => {
    setRefetchUsers(!refetchUsers)
    closeModalCreateUser()
  }

  const buildUser = ({
    name,
    lastName,
    newEmail,
    business,
    newPassword,
    businessSelect
  }): newUser => {
    return {
      name,
      last_name: lastName,
      email: newEmail,
      business: business ?? businessSelect,
      password: newPassword,
      password_confirmation: newPassword
    }
  }

  const onFinishForm = ({ name, lastName, newEmail, business, newPassword, businessSelect }) => {
    const user = buildUser({ name, lastName, newEmail, business, newPassword, businessSelect })
    createUser(user)
  }

  return {
    onFinishForm,
    loadingCreateUser
  }
}

export default useModalCreateUserViewModel
