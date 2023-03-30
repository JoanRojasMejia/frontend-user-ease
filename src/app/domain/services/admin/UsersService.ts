import { newUser } from '../../models/admin/Users'
import { UsersRepository } from '../../repositories/admin/UsersRepository'

export const usesrService = (repository: UsersRepository): UsersRepository => ({
  getAllUsers<T>() {
    return repository.getAllUsers<T>()
  },
  saveUser<T>(user: newUser) {
    return repository.saveUser<T>(user)
  },
  deleteUser<T>(id: string) {
    return repository.deleteUser<T>(id)
  },
  getBusiness<T>() {
    return repository.getBusiness<T>()
  }
})
