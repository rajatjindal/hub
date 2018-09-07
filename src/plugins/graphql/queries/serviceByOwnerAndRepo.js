import gql from 'graphql-tag'

export default gql`query ServiceByOwnerAndRepo($owner: Username!, $repo: Username!) {
  allOwners(condition: { username: $owner }) {
    nodes {
      repos(condition:{ name: $repo }) {
        nodes {
          services {
            nodes {
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
          }
        }
      }
    }
  }
}`
