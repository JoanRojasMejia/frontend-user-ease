import { FloatButton, Table } from 'antd'
import useAdminViewModel from './view-model/admin.view-model'
import NavBar from './components/NavBar'

import './scss/admin.page.scss'
import { AddUserIcon } from '../../../global/icons/Icons'
import ModalCreateUser from './components/modal-create-user/ModalCreateUser'

const AdminPage = () => {
  const {
    loadingUsers,
    users,
    columnsTable,
    nameComplete,
    modalCreateUser,
    business,
    typeUser,
    openModalCreateUser,
    refetchUsers,
    setRefetchUsers,
    isAvailableUser,
    closeModalCreateUser
  } = useAdminViewModel()

  return (
    <div className="adminPage">
      <NavBar name={nameComplete} />
      <div className="containerTable">
        <Table
          dataSource={users}
          columns={columnsTable}
          loading={loadingUsers}
          pagination={false}
          rowKey={'_id'}
          size="small"
        />
      </div>
      {isAvailableUser && (
        <FloatButton
          type="default"
          tooltip={<div>Agregar usuario</div>}
          icon={<AddUserIcon />}
          onClick={openModalCreateUser}
        />
      )}

      {modalCreateUser && modalCreateUser.open && (
        <ModalCreateUser
          typeUser={typeUser}
          business={business}
          refetchUsers={refetchUsers}
          setRefetchUsers={setRefetchUsers}
          modalCreateUser={modalCreateUser}
          closeModalCreateUser={closeModalCreateUser}
        />
      )}
    </div>
  )
}

export default AdminPage
