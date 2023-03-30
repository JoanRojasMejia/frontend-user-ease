import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { User } from '../../domain/models/auth/User'
import { createSelectors } from './selector/selector-store'
import { Cookie } from '../cookie/Cookie'
import jwt from 'jwt-decode'

type GlobalStateApp = {
  user: User | undefined
}

//user: Cookie.getToken() ? jwt(Cookie.getToken()) : undefined,

const useGlobalStore = create<GlobalStateApp>()(
  devtools((set) => ({
    user: Cookie.getToken() ? jwt(Cookie.getToken()) : undefined
  }))
)

export const updateUser = (infoUser: User) =>
  useGlobalStore.setState((state) => ({ user: { ...state.user, ...infoUser } }))

export const selectorGlobalState = createSelectors(useGlobalStore)
