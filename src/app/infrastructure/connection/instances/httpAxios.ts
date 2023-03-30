import axios from 'axios'
import { Http } from '../../../domain/repositories/Http'
import { Cookie } from '../../cookie/Cookie'

const headers = {
  'Content-Type': 'application/json',
  ...(Cookie.getToken() && { Authorization: `Bearer ${Cookie.getToken()}` })
}

export const httpAxios: Http = {
  get: async (path: string, params?: Record<string, any>, config?: any, addHeaders?: any) => {
    const response = await axios
      .get(path, { ...config, params: params, headers: { ...headers, ...addHeaders } })
      .catch(function (error) {
        if (error.response) {
          throw error.response
        }
      })
    return response
  },
  post: async (path: string, params?: Record<string, any>, config?: any, addHeaders?: any) => {
    const response = await axios
      .post(path, { ...params }, { ...config, headers: { ...headers, ...addHeaders } })
      .catch(function (error) {
        if (error.response) {
          throw error.response
        }
      })
    return response
  },
  put: async (path: string, params?: Record<string, any>, config?: any, addHeaders?: any) => {
    const response = await axios
      .put(path, { ...params }, { ...config, headers: { ...headers, ...addHeaders } })
      .catch(function (error) {
        if (error.response) {
          throw error.response
        }
      })
    return response
  },
  delete: async (path: string, params?: any, config?: any, addHeaders?: any) => {
    const response = await axios
      .delete(path, { ...config, params: params, headers: { ...headers, ...addHeaders } })
      .catch(function (error) {
        if (error.response) {
          throw error.response
        }
      })
    return response
  }
}
