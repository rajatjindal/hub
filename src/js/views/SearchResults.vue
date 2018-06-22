<template>
  <div class="index">
    <div class="columns">
      <div class="column is-one-fifth sidebar">
        <topics-list v-model="topics" v-if="topics.length > 0"/>
      </div>
      <div class="column is-8 main-container">
        <div class="search-bar-container">
          <search-bar :value="search" ref="searchBar"/>
        </div>

        <div v-if="totalItems > 0">
          <div class="level is-mobile service-result-title-container">
            <div class="level-left"><h2 class="is-marginless">{{totalItems}} service results</h2></div>
            <div class="level-right">
              <div class="select is-small">
                <select v-model="orderBy">
                  <option selected value="NATURAL">Sort</option>
                  <option value="ALIAS_ASC">Name</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div class="tile is-ancestor">
              <div class="tile is-parent is-vertical">
                <div v-for="r in results" class="tile is-child search-result">
                  <service-summary :title="r.alias" :description="r.description" :tags="r.topics"></service-summary>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          We couldn't find any services matching '{{search}}'
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import queries from '../utils/graphql';

import PaginationBar from '../components/PaginationBar';
import ServiceSummary from '../components/ServiceSummary';
import SearchBar from '../components/SearchBar';

export default {
  name: 'SearchResults',
  props: ['search'],
  apollo: {
    results: {
      query: queries.SEARCH_SERVICE_QUERY,
      variables() {
        return {
          searchTerm: this.search || 'microservice',
        };
      },
      update(data) {
        this.totalItems = data.searchServices.totalCount;
        return data.searchServices.edges.map(e => e.node);
      },
    },
  },
  data() {
    return {
      orderBy: 'NATURAL',
      totalItems: 0,
      results: [],
    };
  },
  computed: {
    topics() {
      return this.results.map(r => r.topics);
    },
  },
  components: {
    PaginationBar,
    ServiceSummary,
    SearchBar,
  },
};
</script>

<style scoped lang="styl">
h2
  font-weight normal
  font-size 1.8em
  line-height 1.8em
  margin-top 1em

.index
  min-height 650px

.link
  cursor pointer

.main-container
  margin-bottom 2em

.sidebar
  margin-top 1.6em
  ul
    line-height 2em

.columns
  max-width 1100px
  margin 0 auto
  text-align left

.search-bar-container
  margin-top 1.5em
  margin-bottom 1em

.service-result-title-container
  margin-top 1em
  margin-bottom 0.8em

.help-text
  color #727272

.search-result
  padding-top 1.5em
  border-top 1px solid #C7C7C7
</style>
