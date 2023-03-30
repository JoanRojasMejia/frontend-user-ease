// import reactLogo from './assets/react.svg'
import './scss/auth.scss'
import { Button, Form, Input } from 'antd'
import useAuthViewModel from './view_model/auth.view-model'
import { BackgroundLogo, Emailcon, Passwordcon, UserEaseIcon } from '../../../global/icons/Icons'

const { Item } = Form
const { Password } = Input

const AuthPage = () => {
  const { onFinishForm, loadingAuth } = useAuthViewModel()

  return (
    <div className="loginPage">
      <div className="containerForm">
        <Form onFinish={onFinishForm}>
          <UserEaseIcon />
          <Item
            name="email"
            rules={[
              { required: true, message: '¡Porfavor introduce tu email!' },
              { type: 'email', message: '¡Introduce un email valido!' }
            ]}
          >
            <Input prefix={<Emailcon />} placeholder="Email" />
          </Item>
          <Item
            name="password"
            rules={[{ required: true, message: '¡Porfavor introduce tu contrasena!' }]}
          >
            <Password placeholder="Contrasena" prefix={<Passwordcon />} />
          </Item>
          <Item>
            <Button
              loading={loadingAuth}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Item>
        </Form>
      </div>
      <div className="containerBackground">
        <BackgroundLogo />
      </div>
    </div>
  )
}

export default AuthPage
