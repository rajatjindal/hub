<template>
  <div class="has-background-light">
    <div class="container">
      <div class="columns is-gapless">
        <div class="column">
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
              class="section full">
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
              v-if="!search && (!category || category === 'All Services')"
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
              v-if="!search && (!category || category === 'All Services')"
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
              v-else-if="(!category || category === 'All Services')"
              class="section">
              <transition-group
                v-if="!isSearchLoading"
                tag="div"
                name="fade">
                <div
                  v-if="searchTotalItems > 0"
                  key="results">
                  <h2 class="title is-size-4 has-text-gray-2">{{ searchTotalItems }} service results</h2>
                </div>
                <div
                  v-else
                  key="no-results"
                  class="no-results">
                  <div class="columns is-centered">
                    <div class="column is-half has-text-centered">
                      <a-icon icon="file-broken" />
                      <h5 class="is-size-5 has-text-weight-semibold has-text-gray-2">We couldn't find any service matching « {{ search }} »</h5>
                    </div>
                  </div>
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
                        class="tile search-result">
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
                <div
                  key="no-results"
                  class="no-results">
                  <div class="columns is-centered">
                    <div class="column is-two-thirds has-text-centered">
                      <a-icon icon="file-broken" />
                      <h5 class="is-size-5 has-text-weight-semibold has-text-gray-2">We couldn't find any service containing the topic « {{ category }} »</h5>
                    </div>
                  </div>
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
            <section class="section">
              <div class="columns contribute-services has-background-light">
                <div class="column is-half">
                  <span class="tag is-danger has-text-weight-semibold">Public</span>
                  <p class="is-size-7 has-text-gray-3 has-text-weight-semibold">Let's go crazy!</p>
                  <h5 class="is-size-5 has-text-gray-2 has-text-weight-bold">Create your service !</h5>
                  <a-button
                    state="secondary"
                    size="small"
                    arrow
                  >
                    Add your service
                  </a-button>
                </div>
                <div class="column is-half">
                  <span class="tag is-success has-text-weight-semibold">Public</span>
                  <p class="is-size-7 has-text-gray-3 has-text-weight-semibold">Let's go crazy!</p>
                  <h5 class="is-size-5 has-text-gray-2 has-text-weight-bold">Contribute a service !</h5>
                  <a-button
                    state="secondary"
                    size="small"
                    arrow
                  >
                    Add your service
                  </a-button>
                </div>
              </div>
            </section>
          </a-section>
        </div>
      </div>
    </div>
    <div class="section has-background-light">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h2 class="is-size-4 has-text-gray-2 title">
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
import ServicesTopicsList from '@/components/ServicesTopicsList'
import ArticleSummary from '@/components/ArticleSummary'

export default {
  name: 'Index',
  components: {
    ServicesTopicsList,
    ServiceSummary,
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
      this.$router.push({ name: 'services', query: { search: this.search !== '' ? this.search : undefined, c: cat !== '' ? cat : undefined } })
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

.no-results {
  margin: 10rem 0;
  h5 {
    margin-top: 2rem;
  }
}

.search-result {
  margin: 2rem 0 !important;
}

.contribute-services {
  border-radius: 1rem;
  padding: 2.5rem 0;
  position: relative;
  .column {
    padding: 0 3.25rem;

    p {
      margin-top: .5rem;
    }

    .button {
      margin-top: 1rem;
    }
  }
  .column + .column {
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      bottom: 0;
      width: .1rem;
      background-color: darken($light, 10%);
    }
  }
}
</style>
