import { Modal, Form, Input, Button, Select } from 'antd'
import useModalCreateUserViewModel from './view-model/modal-create-user.view-model'

const { Item } = Form
const { Option } = Select

const ModalCreateUser = ({
  modalCreateUser,
  closeModalCreateUser,
  setRefetchUsers,
  refetchUsers,
  business,
  typeUser
}) => {
  const { onFinishForm, loadingCreateUser } = useModalCreateUserViewModel(
    closeModalCreateUser,
    setRefetchUsers,
    refetchUsers
  )

  return (
    <Modal
      open={modalCreateUser.open}
      centered
      maskClosable={false}
      footer={null}
      onCancel={closeModalCreateUser}
      className="modalCreateUser"
      confirmLoading={loadingCreateUser}
    >
      <h4>Crear usuario</h4>
      <Form
        autoComplete="off"
        initialValues={{ ...(typeUser !== 1 && { business: modalCreateUser.businessName }) }}
        onFinish={onFinishForm}
      >
        <Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Porfavor ingresa el nombre!'
            }
          ]}
          hasFeedback
        >
          <Input placeholder="Nombres" />
        </Item>
        <Item
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Porfavor ingresa los apellidos!'
            }
          ]}
          hasFeedback
        >
          <Input placeholder="Apellidos" />
        </Item>
        <Item
          name="newEmail"
          rules={[
            {
              required: true,
              message: 'Porfavor ingresa el email!'
            },
            { type: 'email', message: '¡Introduce un email valido!' }
          ]}
          hasFeedback
        >
          <Input placeholder="Email" autoComplete="off" />
        </Item>
        <Item
          name="business"
          rules={[
            {
              required: true,
              message: 'Selecciona una empresa!'
            }
          ]}
        >
          <Select placeholder="Selecciona una empresa" disabled={typeUser !== 1}>
            {typeUser === 1 ? (
              business &&
              business.map((buss) => {
                return (
                  <Option key={buss._id} value={buss._id}>
                    {buss.name}
                  </Option>
                )
              })
            ) : (
              <Option value={modalCreateUser.business}>{modalCreateUser.businessName}</Option>
            )}
            {}
          </Select>
        </Item>
        <Item
          name="newPassword"
          rules={[
            {
              required: true,
              message: 'Porfavor ingresa la contrasena!'
            }
          ]}
          hasFeedback
        >
          <Input.Password autoComplete="off" placeholder="Contrasena" />
        </Item>
        <Item
          name="confirm"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Porfavor ingresa la contrasena!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Las contrasenas no coinciden!'))
              }
            })
          ]}
        >
          <Input.Password placeholder="Confirmar contrasena" />
        </Item>
        <Button loading={loadingCreateUser} htmlType="submit" type="primary">
          Crear usuario
        </Button>
      </Form>
    </Modal>
  )
}

export default ModalCreateUser
