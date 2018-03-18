import { login, register } from './mutations'
import { getCurrent } from './queries'

const map: GqlMap = {
  mutations: {
    userLogin: login,
    userRegister: register
  },
  queries: {
    userCurrent: getCurrent
  }
}

export default map
