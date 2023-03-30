import { httpAxios } from '../httpAxios'
import { Http } from '../../../../domain/repositories/Http'
import { UsersRepository } from '../../../../domain/repositories/admin/UsersRepository'
import { usersRepository } from '../../repositories/admin/UsersRepository'

const client: Http = httpAxios

export const usersIntanceRepository: UsersRepository = usersRepository(client)
