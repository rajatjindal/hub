import gql from 'graphql-tag';

const INDEX_QUERY = gql`{
  recentlyAddedServices: allServices(first: 6) {
    nodes {
      uuid
      alias
      description
      topics
    }
  }
}`;

const SERVICE_QUERY = gql`query ServiceByAlias($where: Alias!) {
  serviceByAlias(alias: $where) {
    uuid
    alias
    description
    topics
    pullUrl
    serviceTags {
      nodes {
        tag
        state
        configuration
      }
    }
  }
}`;

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
      }
    }
  }
}`;

export default {
  INDEX_QUERY,
  SERVICE_QUERY,
  SEARCH_SERVICE_QUERY,
};
