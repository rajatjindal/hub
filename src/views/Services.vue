<template>
  <div class="services has-background-light">
    <a-section absolute-header>
      <template slot="header-left">
        <span>
          <i class="mdi mdi-bookmark-outline" />
        </span>
        <span class="is-size-8 has-text-gray-2 has-text-weight-semibold">TOPICS</span>
      </template>
      <template slot="sidebar">
        <services-topics-list
          v-model="topics"
          :category="category"
          @select="selectCategory" />
      </template>
      <section
        v-if="!search && (!category || category === 'All Services')"
        class="section">
        <h4 class="title is-size-4 has-text-gray-2">Featured services</h4>
        <div class="featured-services">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <router-link
                :to="`/service/slack`"
                class="feature tile is-child">
                <div class="image">
                  <img
                    src="@/assets/img/services/featured/slack.png"
                    srcset="@/assets/img/services/featured/slack@2x.png 2x,
                            @/assets/img/services/featured/slack@3x.png 3x"
                    alt="Slack">
                </div>
              </router-link>
            </div>

            <div class="tile is-parent">
              <router-link
                :to="`/service/twitter`"
                class="feature tile is-child">
                <div class="image">
                  <img
                    src="@/assets/img/services/featured/twitter.png"
                    srcset="@/assets/img/services/featured/twitter@2x.png 2x,
                            @/assets/img/services/featured/twitter@3x.png 3x"
                    alt="Twitter">
                </div>
              </router-link>
            </div>

            <div class="tile is-parent">
              <router-link
                :to="`/service/twilio`"
                class="feature tile is-child">
                <div class="image">
                  <img
                    src="@/assets/img/services/featured/twilio.png"
                    srcset="@/assets/img/services/featured/twilio@2x.png 2x,
                            @/assets/img/services/featured/twilio@3x.png 3x"
                    alt="Twilio">
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </section>
      <section
        v-if="!search && !category"
        class="section">
        <h5 class="is-size-5 has-text-gray-2 title">Recently Added</h5>
        <div class="section-body">
          <div class="tile is-ancestor">
            <transition-group
              name="fade"
              tag="div"
              class="tile is-parent is-vertical">
              <div
                v-for="(r, index) in data.recentServices.slice(0, 3)"
                :key="r.alias || index"
                class="tile is-child">
                <service-summary
                  :title="getTitle(r)"
                  :is-alias="r.alias ? true : false"
                  :description="r.description"
                  :tags="r.topics"/>
              </div>
            </transition-group>
            <transition-group
              name="fade"
              tag="div"
              class="tile is-parent is-vertical">
              <div
                v-for="(r, index) in data.recentServices.slice(3, 6)"
                :key="r.alias || index"
                class="tile is-child">
                <service-summary
                  :title="getTitle(r)"
                  :is-alias="r.alias ? true : false"
                  :description="r.description"
                  :tags="r.topics"/>
              </div>
            </transition-group>
          </div>
        </div>
      </section>
      <section
        v-if="!search && !category"
        class="section">
        <h5 class="is-size-5 has-text-gray-2 title">Most Used</h5>
        <div class="section-body">
          <div class="tile is-ancestor">
            <transition-group
              name="fade"
              tag="div"
              class="tile is-parent is-vertical">
              <div
                v-for="(r, index) in data.recentServices.slice(0, 3)"
                :key="r.alias || index"
                class="tile is-child">
                <service-summary
                  :title="getTitle(r)"
                  :is-alias="r.alias ? true : false"
                  :description="r.description"
                  :tags="r.topics"/>
              </div>
            </transition-group>
            <transition-group
              name="fade"
              tag="div"
              class="tile is-parent is-vertical">
              <div
                v-for="(r, index) in data.recentServices.slice(3, 6)"
                :key="r.alias || index"
                class="tile is-child">
                <service-summary
                  :title="getTitle(r)"
                  :is-alias="r.alias ? true : false"
                  :description="r.description"
                  :tags="r.topics"/>
              </div>
            </transition-group>
          </div>
        </div>
      </section>
      <section
        v-else-if="!category"
        class="section">
        <transition-group
          v-if="!isSearchLoading"
          tag="div"
          name="fade">
          <div
            v-if="searchTotalItems > 0"
            key="results">
            <h2 class="title is-3">{{ searchTotalItems }} service results</h2>
          </div>
          <div
            v-else
            key="no-results">
            <h3 class="subtitle is-4"><font-awesome-icon icon="search" /> We couldn't find any services matching `{{ search }}`</h3>
          </div>
        </transition-group>
        <div>
          <div class="tile is-ancestor">
            <div class="tile is-parent is-vertical">
              <transition-group
                tag="div"
                name="fade">
                <div
                  v-for="(r, index) in searchResults"
                  :key="r.alias || index"
                  class="tile is-child search-result">
                  <service-summary
                    :title="getTitle(r)"
                    :is-alias="r.alias ? true : false"
                    :description="r.description"
                    :tags="r.topics"/>
                </div>
              </transition-group>
            </div>
          </div>
        </div>
      </section>
      <section
        v-else
        class="section">
        <transition-group
          tag="div"
          name="fade">
          <!-- <div key="results" v-if="searchCatTotalItems > 0">
            <h2 class="title is-3">{{searchCatTotalItems}} service results</h2>
          </div> -->
          <div key="no-results">
            <h3 class="subtitle is-4"><font-awesome-icon icon="search" /> We couldn't find any service containing the topic `{{ category }}`</h3>
          </div>
        </transition-group>
        <!-- <div>
          <div class="tile is-ancestor">
            <div class="tile is-parent is-vertical">
              <transition-group tag="div" name="fade">
                <div v-for="(r, index) in searchCatResults" :key="r.alias || index" class="tile is-child search-result">
                  <service-summary :title="getTitle(r)" :is-alias="r.alias ? true : false" :description="r.description" :tags="r.topics"></service-summary>
                </div>
              </transition-group>
            </div>
          </div>
        </div> -->
      </section>
    </a-section>

    <div class="section has-background-light">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h2 class="is-size-4 has-text-gray-2">
                Community
              </h2>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <a-button
                url="//asyncy.com/blog"
                state="secondary"
                arrow
                size="small"
              >
                View More
              </a-button>
            </div>
          </div>
        </div>
        <transition-group
          name="fade"
          tag="div"
          class="columns articles-container">
          <div
            v-for="(r, index) in data.recentServices.slice(0, 3)"
            :key="r.alias || index"
            class="column is-one-third">
            <article-summary
              :title="getTitle(r)"
              :description="r.description" />
          </div>
        </transition-group>
      </div>
    </div>
    <a-join
      is-paddingless
      footer />
  </div>
</template>

<script>
import { IndexQuery, SearchQuery } from '@/plugins/graphql'
import ServiceSummary from '@/components/ServiceSummary'
import ASection from '@/components/ASection'
import SearchBar from '@/components/SearchBar'
import ServicesTopicsList from '@/components/ServicesTopicsList'
import ArticleSummary from '@/components/ArticleSummary'

export default {
  name: 'Index',
  components: {
    ServicesTopicsList,
    ServiceSummary,
    SearchBar,
    ASection,
    ArticleSummary
  },
  props: {
    search: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: undefined
    }
  },
  apollo: {
    data: {
      query: IndexQuery,
      update: data => ({
        recentServices: data.recentlyAddedServices.nodes
      })
    },
    searchResults: {
      query: SearchQuery,
      skip () { this.isSearchLoading = true; this.searchResults = [{}, {}, {}]; return !this.search },
      variables: function () {
        return {
          searchTerm: this.search || ' '
        }
      },
      update: function (data) {
        this.isSearchLoading = false
        if (data.searchServices) {
          this.searchTotalItems = data.searchServices.totalCount
          return data.searchServices.edges.map(e => e.node)
        } else {
          this.searchTotalItems = 0
        }
        return []
      }
    }
  },
  data: () => ({
    data: {
      recentServices: [{}, {}, {}, {}, {}, {}]
    },
    searchResults: [{}, {}, {}],
    searchTotalItems: 0,
    isSearchLoading: true
  }),
  computed: {
    topics: function () {
      return this.data.recentServices.map(s => s.topics)
    }
  },
  watch: {
    '$route': function () {
      this.isSearchLoading = true
    }
  },
  methods: {
    getTitle: function (r) {
      if (!r.alias && (!r.owner || !r.owner.username)) {
        return ''
      }
      return r.alias || `${r.owner.username}/${r.name}`
    },
    selectCategory: function (cat) {
      this.$router.push({ name: 'services', query: { search: this.search, c: cat } })
    }
  }
}
</script>

<style lang="scss">
.feature {
  img {
    transition: all .2s ease-in;
    border-radius: .75rem;
    box-shadow: 0 0 0 0 rgba($black, .6);
  }
  &:hover {
    img {
      transform: translateY(-.5rem);
      box-shadow: 0 1.5rem 3.5rem -1rem rgba($black, .6);
    }
  }
}
</style>
