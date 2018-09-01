<template>
  <two-column-sidebar>
    <div slot="sidebar">
      <transition name="fade">
        <organization-infos :title="serviceName" :username="serviceUserName" />
      </transition>
    </div>
    <div slot="body" class="body">

      <div>
        <transition name="fade">
          <div class="level is-mobile service-result-title-container" v-if="results.length > 0">
            <div class="level-left">
              <transition name="fade">
                <h2 v-if="serviceName" class="is-marginless">{{ totalItems || '' }} services</h2>
                <h2 v-else class="loading-shimmer tag"></h2>
              </transition>
            </div>
          </div>
        </transition>

        <div>
          <div class="tile is-ancestor">
            <div class="tile is-parent is-vertical">
              <transition-group tag="div" name="fade">
                <div v-for="(r, index) in results" :key="`organization-list-item-${index}`" class="tile is-child search-result">
                  <service-summary :title="getTitle(r)" :is-alias="r.alias ? true : false" :description="r.description" :tags="r.topics"></service-summary>
                </div>
              </transition-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </two-column-sidebar>
</template>

<script>
import queries from '../utils/graphql';

import PaginationBar from '../components/PaginationBar';
import ServiceSummary from '../components/ServiceSummary';
import OrganizationInfos from '../components/OrganizationInfos';

export default {
  name: 'SearchResults',
  props: ['owner'],
  apollo: {
    results: {
      query: queries.SERVICE_BY_OWNER_QUERY,
      skip() {
        return !this.owner;
      },
      variables() {
        return {
          owner: this.owner,
        };
      },
      update(data) {
        if (data.allOwners.nodes.length > 0) {
          this.serviceName = data.allOwners.nodes[0].name;
          this.serviceUserName = data.allOwners.nodes[0].username;
          this.totalItems = data.allOwners.nodes[0].repos.totalCount;
        }
        return data.allOwners.nodes.length > 0 &&
          data.allOwners.nodes[0].repos.nodes.length > 0 &&
          data.allOwners.nodes[0].repos.nodes.reduce((r, c) => [...r, c.services.nodes[0]], []);
      },
    },
  },
  data() {
    return {
      isLoading: true,
      orderBy: 'NATURAL',
      totalItems: 3,
      serviceName: undefined,
      serviceUserName: undefined,
      results: [{}, {}, {}],
      serviceByOwner: undefined,
    };
  },
  watch: {
    results(newValue) {
      if (!newValue) this.$router.push('/404');
    },
  },
  computed: {
    topics() {
      return this.results.map(r => r.topics);
    },
    service() {
      return this.serviceByOwner || {};
    },
  },
  methods: {
    getTitle(r) {
      if (!r.alias && (!r.repo || !r.repo.owner)) {
        return '';
      }
      return r.alias || `${r.repo.owner.username}/${r.repo.name}`;
    },
  },
  components: {
    PaginationBar,
    ServiceSummary,
    OrganizationInfos,
  },
};
</script>

<style scoped lang="styl">
h2
  font-weight normal
  font-size 1.8em
  line-height 1.8em
  margin-top 1em

.body
  padding-bottom 2em

.link
  cursor pointer

.search-icon
  margin-right 15px
  filter brightness(70%)

.search-bar-container
  margin-bottom 1em

.help-text
  color #727272

.service-result-title-container
  margin-top 1em
  margin-bottom 0.8em

.search-result
  padding-top 1.5em
  padding-bottom 1em
  border-top 1px solid #C7C7C7

  &:last-child
    border-bottom 1px solid #C7C7C7
</style>
