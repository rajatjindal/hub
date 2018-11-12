import gql from 'graphql-tag'

export default gql`query ServiceByOwner($owner: Username!) {
  allOwners(condition: { username: $owner }, first: 1) {
    nodes {
      username
      name
      repos {
        totalCount
        nodes {
          services {
            nodes {
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
          }
        }
      }
    }
  }
}`
