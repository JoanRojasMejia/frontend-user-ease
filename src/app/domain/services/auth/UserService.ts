import { UserRepository } from '../../repositories/auth/UserRepository'

export const userService = (repository: UserRepository): UserRepository => ({
  getTokenUser<T>(credentials: { email: string; password: string }) {
    return repository.getTokenUser<T>(credentials)
  }
})
