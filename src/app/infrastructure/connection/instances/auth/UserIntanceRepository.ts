import { httpAxios } from '../httpAxios'
import { userRepository } from '../../repositories/auth/UserRepository'
import { UserRepository } from '../../../../domain/repositories/auth/UserRepository'
import { Http } from '../../../../domain/repositories/Http'

const client: Http = httpAxios

export const userIntanceRepository: UserRepository = userRepository(client)
