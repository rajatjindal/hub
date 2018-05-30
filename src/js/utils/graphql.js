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
  }
}`;

const SEARCH_QUERY = gql`query ServiceByAlias($after: String, $where: ServiceWhereArgs!) {
  viewer {
    allServices(first: 10, after: $after, where: $where) {
      aggregations {
        count
      },
      edges {
        cursor
        node {
          id
          alias
          topics
        }
      }
    }
  }
}`;

export default {
  INDEX_QUERY,
  SERVICE_QUERY,
  SEARCH_QUERY,
};
