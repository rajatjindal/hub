import gql from 'graphql-tag';

const INDEX_QUERY = gql`{
  featuredServices: allServices(first: 3) {
    nodes {
      uuid
      alias
      topics
    }
  },
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
    serviceTagsByServiceUuid {
      nodes {
        tag
        state
        configuration
        readme
      }
    }
  }
}`;

const SEARCH_SERVICE_QUERY = gql`query SearchServices($orderBy: [ServicesOrderBy!], $condition: ServiceCondition!) {
  allServices(orderBy: $orderBy, condition: $condition) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        alias
        topics
        description
      }
    }
  }
}`;

export default {
  INDEX_QUERY,
  SERVICE_QUERY,
  SEARCH_SERVICE_QUERY,
};
