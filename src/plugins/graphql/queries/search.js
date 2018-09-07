import gql from 'graphql-tag'

export default gql`query SearchServices($searchTerm: String!) {
  searchServices(searchTerms: $searchTerm, first: 25) {
    totalCount
    pageInfo {
      endCursor
    }
    edges {
      node {
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
  }
}`
