import { Popconfirm, Tag, Tooltip } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TrashIcon } from '../../../../global/icons/Icons'
import { Users } from '../../../domain/models/admin/Users'

export const columnsUserTable = ({
  typeUsers,
  deleteUser,
  loadingDeleteUsers,
  isAvailableUser
}) => {
  const initialStateCustomTableOrder: ColumnsType<Users> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      // width: 95,
      ellipsis: true
      // align: 'center'
    },
    {
      title: 'Apellido',
      dataIndex: 'last_name',
      key: 'last_name',
      // width: 95,
      ellipsis: true
      // align: 'center'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      // width: 95,
      ellipsis: true
      // align: 'center'
    },
    {
      title: 'Empresa',
      dataIndex: 'business',
      key: 'business',
      // width: 95,
      ellipsis: true,
      align: 'center',
      render: (business) => {
        return (
          <span>
            <Tag style={{ fontSize: '13px', fontWeight: '500'}} color={business.color}>
              {business.name}
            </Tag>
          </span>
        )
      }
    },
    {
      title: 'Tipo usuario',
      dataIndex: 'type',
      key: 'type',
      // width: 95,
      ellipsis: true,
      align: 'center',
      render: (type) => {
        return (
          <span className="containerTag" style={{ color: typeUsers[type].color }}>
            {typeUsers[type].name}
          </span>
        )
      }
    }
  ]

  if (isAvailableUser) {
    initialStateCustomTableOrder.push({
      title: 'Acciones',
      dataIndex: '_id',
      key: '_id',
      width: 115,
      align: 'center',
      render: (id) => {
        return (
          <Popconfirm
            title="Deseas eliminar este usuario?"
            onConfirm={() => deleteUser(id)}
            okButtonProps={{ loading: loadingDeleteUsers }}
            okText="Si"
            cancelText="No"
          >
            <span className="containerIcon">
              <TrashIcon />
            </span>
          </Popconfirm>
        )
      }
    })
  }

  return initialStateCustomTableOrder
}
