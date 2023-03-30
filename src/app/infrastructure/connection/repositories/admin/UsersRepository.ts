import { newUser } from '../../../../domain/models/admin/Users'
import { UsersRepository } from '../../../../domain/repositories/admin/UsersRepository'
import { Http } from '../../../../domain/repositories/Http'
import { RequestCallEntity } from '../../../../domain/repositories/RequestCallEntity'
import { Cookie } from '../../../cookie/Cookie'

export const usersRepository = (client: Http): UsersRepository => ({
  getAllUsers<T>() {
    const url = `${import.meta.env.VITE_URL_APP}/user`
    const controller = new AbortController()

    const wrappedCall = {
      call: client.get(
        url,
        {},
        { signal: controller.signal },
        { Authorization: `Bearer ${Cookie.getToken()}` }
      ),
      controller
    }

    return wrappedCall as RequestCallEntity<T>
  },
  saveUser<T>(user: newUser) {
    const url = `${import.meta.env.VITE_URL_APP}/auth/register`
    const controller = new AbortController()

    const wrappedCall = {
      call: client.post(
        url,
        user,
        { signal: controller.signal },
        { Authorization: `Bearer ${Cookie.getToken()}` }
      ),
      controller
    }

    return wrappedCall as RequestCallEntity<T>
  },

  deleteUser<T>(id: string) {
    const url = `${import.meta.env.VITE_URL_APP}/user/${id}`
    const controller = new AbortController()

    const wrappedCall = {
      call: client.delete(
        url,
        {},
        { signal: controller.signal },
        { Authorization: `Bearer ${Cookie.getToken()}` }
      ),
      controller
    }

    return wrappedCall as RequestCallEntity<T>
  },
  getBusiness<T>() {
    const url = `${import.meta.env.VITE_URL_APP}/business`
    const controller = new AbortController()

    const wrappedCall = {
      call: client.get(
        url,
        {},
        { signal: controller.signal },
        { Authorization: `Bearer ${Cookie.getToken()}` }
      ),
      controller
    }

    return wrappedCall as RequestCallEntity<T>
  }
})
