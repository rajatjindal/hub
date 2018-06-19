<template>
  <div class="index">
    <div class="columns">
      <div class="column is-12 body">
        <div class="level name-container is-mobile">
          <div class="level-left">
            <h2>{{ topic | from-topic }}</h2>
          </div>
        </div>
        <div class="results-container">
          <div class="tile is-ancestor">
            <div class="tile is-parent is-vertical">
              <div v-for="(r, index) in results" class="tile is-parent" :key="index">
                <div class="tile is-child is-6">
                  <service-summary :title="r[0].alias" :description="r[0].description" :tags="r[0].topics"></service-summary>
                </div>
                <div class="tile is-child is-6" v-if="r.length > 1">
                  <service-summary :title="r[1].alias" :description="r[1].description" :tags="r[1].topics"></service-summary>
                </div>
              </div>
              <div v-if="results.length === 0">
                No search results found for "{{search}}".
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chunk from 'chunk';
import queries from '../utils/graphql';
import ServiceSummary from '../components/ServiceSummary';

export default {
  props: ['topic'],
  data() {
    return {
      totalItems: 0,
      results: [],
    };
  },
  apollo: {
    results: {
      query: queries.SEARCH_SERVICE_QUERY,
      variables() {
        return {
          searchTerm: this.topic || 'microservice',
        };
      },
      update(data) {
        this.totalItems = data.searchServices.totalCount;
        return chunk(data.searchServices.edges.map(e => e.node));
      },
    },
  },
  computed: {

  },
  components: {
    ServiceSummary,
  },
};
</script>

<style scoped lang="styl">
h2
  font-weight normal
  font-size 1.8em
  margin 0


.columns
  max-width 1100px
  margin 25px auto
  text-align left

.results-container
  width 100%
</style>
