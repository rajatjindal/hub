import Index from './queries/index'
import Service from './queries/service'
import ServiceByOwnerAndRepo from './queries/serviceByOwnerAndRepo'
import ServiceByOwner from './queries/serviceByOwner'
import Search from './queries/search'

export const IndexQuery = Index
export const ServiceQuery = Service
export const ServiceByOwnerAndRepoQuery = ServiceByOwnerAndRepo
export const ServiceByOwnerQuery = ServiceByOwner
export const SearchQuery = Search

const queries = {
  Index,
  Service,
  ServiceByOwnerAndRepo,
  ServiceByOwner,
  Search
}

export default queries
