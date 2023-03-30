import './global/scss/app.scss'
import { ConfigProvider } from 'antd'
import App from './global/start/App'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#000406',
        borderRadius: 6,
        colorError: '#c62626',
        colorBgSpotlight: '#000406'
      }
    }}
  >
    <App />
  </ConfigProvider>
)
