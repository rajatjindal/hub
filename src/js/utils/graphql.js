import gql from 'graphql-tag';

const INDEX_QUERY = gql`{
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
}`;

const SERVICE_QUERY = gql`query ServiceByAlias($where: Alias!) {
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
}`;

const SERVICE_BY_OWNER_AND_REPO_QUERY = gql`query ServiceByOwnerAndRepo($owner: Username!, $repo: Username!) {
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
}
`;

const SEARCH_SERVICE_QUERY = gql`query SearchServices($searchTerm: String!) {
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
}`;

export default {
  INDEX_QUERY,
  SERVICE_QUERY,
  SEARCH_SERVICE_QUERY,
  SERVICE_BY_OWNER_AND_REPO_QUERY,
};
