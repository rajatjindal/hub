import gql from 'graphql-tag'

export default gql`query ServiceByAlias($where: Alias!) {
  serviceByAlias(alias: $where) {
    uuid
    alias
    description
    topics
    repo {
      name
      owner {
        username
      }
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
