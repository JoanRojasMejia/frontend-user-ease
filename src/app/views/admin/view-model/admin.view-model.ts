import useFetchAndLoad from '../../../../global/hooks/useFetchAndLoad'
import { usesrService } from '../../../domain/services/admin/UsersService'
import { usersIntanceRepository } from '../../../infrastructure/connection/instances/admin/UsersInstanceRepository'
import { useAsync } from '../../../../global/hooks/useAsync'
import { useState, useEffect } from 'react'
import { Business, Users } from '../../../domain/models/admin/Users'
import { ColumnsType } from 'antd/es/table'
import { columnsUserTable } from '../components/columnsUserTable'
import { selectorGlobalState } from '../../../infrastructure/store/global-store'
import { asyncFunction } from '../../../../global/hooks/utils/asyncFunction'

const useAdminViewModel = () => {
  const usersInstance = usesrService(usersIntanceRepository)

  const currentUser = selectorGlobalState.use.user()
  const isAvailableUser = currentUser!.type === 1 || currentUser!.type === 2

  const [users, setUsers] = useState<Users[]>([])
  const [business, setBusiness] = useState<Business[]>([])
  const [columnsTable, setColumnsTable] = useState<ColumnsType<Users>>([])
  const [refetchUsers, setRefetchUsers] = useState<boolean>(false)
  const [modalCreateUser, setModalCreateUser] = useState<any>({
    open: false,
    business: currentUser!.business,
    businessName: ''
  })

  const typeUsers = {
    1: { name: 'Super Administrador', color: '#117448' },
    2: { name: 'Administrador', color: '#e67237' },
    3: { name: 'Empleado', color: '#d75353' }
  }

  const buildNameComplete = (name: string, lastName: string) => {
    return `${name} ${lastName}`
  }

  const { callEndpoint: callUsers, loading: loadingUsers } = useFetchAndLoad()
  const { callEndpoint: callDeleteUser, loading: loadingDeleteUsers } = useFetchAndLoad()
  const { callEndpoint: callBusiness } = useFetchAndLoad()

  const callUsersRequest = () => callUsers(usersInstance.getAllUsers())

  const callBusinessWithFunction = () => {
    const callBusinessRequest = () => callBusiness(usersInstance.getBusiness())
    asyncFunction(callBusinessRequest, adaptaBusiness)
  }

  const adaptaBusiness = ({ business }: { business: Business[] }) => {
    setBusiness(business)
  }

  const adaptUsers = ({ users }: { users: Users[] }) => {
    if (currentUser!.type === 1) {
      callBusinessWithFunction()
    }
    setModalCreateUser({ ...modalCreateUser, businessName: users[0].business.name })
    setUsers(users)
  }

  useAsync(callUsersRequest, adaptUsers, () => {}, [refetchUsers])

  const callDeleteUserWithFunction = (id: string) => {
    const callDeleteUserRequest = () => callDeleteUser(usersInstance.deleteUser(id))
    asyncFunction(callDeleteUserRequest, adaptDeleteUser)
  }

  const adaptDeleteUser = () => {
    setRefetchUsers(!refetchUsers)
  }

  const deleteUser = (id: string) => {
    callDeleteUserWithFunction(id)
  }

  const openModalCreateUser = () => {
    setModalCreateUser({ ...modalCreateUser, open: true })
  }

  const closeModalCreateUser = () => {
    setModalCreateUser({ ...modalCreateUser, open: false })
  }

  useEffect(() => {
    setColumnsTable(
      columnsUserTable({ typeUsers, deleteUser, loadingDeleteUsers, isAvailableUser })
    )
  }, [refetchUsers])

  return {
    loadingUsers,
    users,
    columnsTable,
    nameComplete: buildNameComplete(currentUser!.name, currentUser!.last_name),
    business,
    typeUser: currentUser!.type,
    openModalCreateUser,
    closeModalCreateUser,
    isAvailableUser,
    modalCreateUser,
    setRefetchUsers,
    refetchUsers
  }
}

export default useAdminViewModel
