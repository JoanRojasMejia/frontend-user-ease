import { newUser } from '../../models/admin/Users'
import { RequestCallEntity } from '../RequestCallEntity'

export interface UsersRepository {
  getAllUsers: <T>() => RequestCallEntity<T>
  saveUser: <T>(user: newUser) => RequestCallEntity<T>
  deleteUser: <T>(id: string) => RequestCallEntity<T>
  getBusiness: <T>() => RequestCallEntity<T>
}
