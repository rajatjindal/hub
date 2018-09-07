import gql from 'graphql-tag'

export default gql`{
  recentlyAddedServices: searchServices(searchTerms: "microservice", first: 10) {
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
    }
  }
}`
