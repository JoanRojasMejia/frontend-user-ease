import { RequestCallEntity } from '../RequestCallEntity'

export interface UserRepository {
  getTokenUser: <T>(credentials: { email: string; password: string }) => RequestCallEntity<T>
}
