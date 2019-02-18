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
        v-if="!search && !category"
        class="section">
        <h2 class="title is-3">Featured services</h2>
        <div class="featured-services section-body">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <router-link :to="`/service/slack`">
                <div class="feature tile is-child">
                  <div class="avatar">
                    <img
                      src="@/assets/slack.png"
                      alt="Slack">
                  </div>
                  <div class="content slack-service">
                    <h4>Slack Service</h4>
                    <p>Slack bot microservice</p>
                  </div>
                </div>
              </router-link>
            </div>

            <div class="tile is-parent">
              <router-link :to="`/service/twitter`">
                <div class="feature tile is-child">
                  <div class="avatar">
                    <img
                      src="@/assets/twitter.png"
                      alt="Twitter">
                  </div>
                  <div class="content twitter-service">
                    <h4>Twitter Service</h4>
                    <p>Twitter as a microservice</p>
                  </div>
                </div>
              </router-link>
            </div>

            <div class="tile is-parent">
              <router-link :to="`/service/twilio`">
                <div class="feature tile is-child">
                  <div class="avatar">
                    <img
                      src="@/assets/twilio.svg"
                      alt="Twilio">
                  </div>
                  <div class="content twilio-service">
                    <h4>Twilio Service</h4>
                    <p>Twilio as a microservice</p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </section>
      <section
        v-if="!search && !category"
        class="section">
        <h2 class="title is-3">Recently added</h2>
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
        <h2 class="title is-3">Most used</h2>
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

export default {
  name: 'Index',
  components: {
    ServicesTopicsList,
    ServiceSummary,
    SearchBar,
    ASection
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
