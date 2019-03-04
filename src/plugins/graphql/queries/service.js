import gql from 'graphql-tag'

export default gql`query ServiceByAlias($where: Alias!) {
  serviceByAlias(alias: $where) {
    uuid
    name
    alias
    pullUrl
    description
    topics
    owner {
      username
    }
    serviceTags {
      nodes {
        readme
        tag
        state
        configuration
      }
    }
  }
}`
