import gql from 'graphql-tag'

export default gql`query ServiceByAlias($where: Alias!) {
  serviceByAlias(alias: $where) {
    uuid
    name
    alias
    description
    topics
    owner {
      username
    }
    serviceTags {
      nodes {
        tag
        state
        configuration
      }
    }
  }
}`
