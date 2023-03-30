import { UserRepository } from '../../../../domain/repositories/auth/UserRepository'
import { Http } from '../../../../domain/repositories/Http'
import { RequestCallEntity } from '../../../../domain/repositories/RequestCallEntity'

export const userRepository = (client: Http): UserRepository => ({
  getTokenUser<T>(credencials: { email: string; password: string }) {
    const url = `${import.meta.env.VITE_URL_APP}/auth/login`
    const controller = new AbortController()

    const wrappedCall = {
      call: client.post(url, credencials, { signal: controller.signal }),
      controller
    }

    return wrappedCall as RequestCallEntity<T>
  }
})
