import { getTopTenProducts } from './queries'

const map: GqlMap = {
  mutations: {},
  queries: {
    topTenProducts: getTopTenProducts
  }
}

export default map
