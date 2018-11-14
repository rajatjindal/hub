<template>
  <div class="services">
    <section class="hero bg--dark is-medium">
      <div class="hero-body">
        <div class="container text--center">
          <stars-particles />
          <h1 class="title is-1 text--light">Asyncy Services</h1>
          <h2 class="subtitle is-4 text--light">Discover awesome services that will help you get started</h2>
        </div>
      </div>
    </section>
    <two-column-sidebar>
      <services-topics-list v-model="topics" slot="sidebar" />
      <div slot="body">
        <section class="section">
          <div class="search-bar-container">
            <div class="field">
              <div class="control">
                <search-bar />
              </div>
            </div>
          </div>
        </section>
        <section class="section">
          <h2 class="title is-3">Featured services</h2>
          <div class="featured-services section-body">
            <div class="tile is-ancestor">
              <div class="tile is-parent">
                <router-link :to="`/service/slack`">
                  <div class="feature tile is-child">
                    <div class="avatar">
                      <img src="@/assets/slack.png" alt="Slack"/>
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
                      <img src="@/assets/twitter.png" alt="Twitter"/>
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
                      <img src="@/assets/twilio.svg" alt="Twilio"/>
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

        <section class="section">
          <h2 class="title is-3">Recently added</h2>
          <div class="section-body">
            <div class="tile is-ancestor">
              <transition-group name="fade" tag="div" class="tile is-parent is-vertical">
                <div v-for="(r, index) in data.recentServices.slice(0, 3)" class="tile is-child" :key="r.alias || index">
                  <service-summary :title="getTitle(r)" :is-alias="r.alias ? true : false" :description="r.description" :tags="r.topics"></service-summary>
                </div>
              </transition-group>
              <transition-group name="fade" tag="div" class="tile is-parent is-vertical">
                <div v-for="(r, index) in data.recentServices.slice(3, 6)" class="tile is-child" :key="r.alias || index">
                  <service-summary :title="getTitle(r)" :is-alias="r.alias ? true : false" :description="r.description" :tags="r.topics"></service-summary>
                </div>
              </transition-group>
            </div>
          </div>
        </section>
        <section class="section">
          <h2 class="title is-3">Most used</h2>
          <div class="section-body">
            <div class="tile is-ancestor">
              <transition-group name="fade" tag="div" class="tile is-parent is-vertical">
                <div v-for="(r, index) in data.recentServices.slice(0, 3)" class="tile is-child" :key="r.alias || index">
                  <service-summary :title="getTitle(r)" :is-alias="r.alias ? true : false" :description="r.description" :tags="r.topics"></service-summary>
                </div>
              </transition-group>
              <transition-group name="fade" tag="div" class="tile is-parent is-vertical">
                <div v-for="(r, index) in data.recentServices.slice(3, 6)" class="tile is-child" :key="r.alias || index">
                  <service-summary :title="getTitle(r)" :is-alias="r.alias ? true : false" :description="r.description" :tags="r.topics"></service-summary>
                </div>
              </transition-group>
            </div>
          </div>
        </section>
      </div>
    </two-column-sidebar>
    <section class="section bg--light">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-half">
              <h2 class="title is-2">List your service on Asyncy Hub</h2>
              <a-button
                state="primary"
                size="l">Submit a Service</a-button>
            </div>
          </div>
        </div>
      </section>
  </div>
</template>

<script>
import { IndexQuery } from '@/plugins/graphql'
import ServiceSummary from '@/components/ServiceSummary'
import SearchBar from '@/components/SearchBar'
import ServicesTopicsList from '@/components/ServicesTopicsList'

// import headerLeft from 'asyncy-ui-components/assets/images/home_header_left.svg'
// import headerRight from 'asyncy-ui-components/assets/images/home_header_right.svg'

export default {
  name: 'index',
  apollo: {
    data: {
      query: IndexQuery,
      update: data => ({
        recentServices: data.recentlyAddedServices.nodes
      })
    }
  },
  data: () => ({
    data: {
      recentServices: [{}, {}, {}, {}, {}, {}]
    }
  }),
  computed: {
    topics: function() {
      return this.data.recentServices.map(s => s.topics)
    }
  },
  methods: {
    getTitle: function(r) {
      if (!r.alias && (!r.organization || !r.organization.username)) {
        return ''
      }
      return r.alias || `${r.organization.username}/${r.name}`
    }
  },
  components: {
    ServicesTopicsList,
    ServiceSummary,
    SearchBar
  }
}
</script>

<style scoped lang="scss">
.hero-header {
  font-size: 2.8em;
}

.services {
  background-color: #fff;
}

.video-section {
  position: relative;
  min-height: 0;
  padding: 0 !important;
  z-index: 1;
  margin-bottom: calc(150px + 2rem);
  .video {
    width: 800px;
    height: 300px;
    border-radius: .75rem;
    position: absolute;
    left: calc(50% - 400px);
    top: -150px;
    margin: 0;
    box-shadow: 0 0 2.25rem .5rem rgba(darken(color(dark), 15%), .5);
    background-color: darken(state(primary), 10%);
    align-items: center;
    justify-content: center;
    display: flex;
    svg {
      cursor: pointer;
      transition: all 0.1s ease-in-out;
      font-size: 4rem;
      position: relative;
      color: $white;
      &:hover {
        font-size: 7rem;
      }
    }
  }
}

.subtitle {
  display: block;
  font-size: 1.15em;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}

.help-message {
  font-size: 0.9em;
  color: #aaa;
}

ul {
  list-style: none;
  padding-left: 0;
  line-height: 2em;
}

.section {
  margin-bottom: 2em;
  padding-bottom: 2em;

  .section-header {
    margin-bottom: 1.4em;
  }
}

.hero {
  position: relative;
  overflow: hidden;
  // padding: 4em 5em;
  // background: #eeeeee;
  z-index: 1;

  .search-bar-container {
    max-width: 580px;
    margin: 0 auto;
  }
}

.call-to-action {
  font-size: 1.9em;
  line-height: 1.4em;
  margin-bottom: 0.8em;
}

.featured-services {
  .featured {
    height: 150px;
    border-radius: 5px;
    padding: 25px;
    font-size: 0.9;
    font-weight: 600;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.05, 1.05);
    }
  }

  .feature {
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
    transition: all .1s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
    .avatar {
      width: 96px;
      height: 96px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: -48px;
      background-color: $white;
      padding: 1rem;
      z-index: 1;
      box-shadow: 0 0 .25rem .1rem rgba(color(dark), .125);
    }

    .content {
      background-color: color(dark);
      &.slack-service { background-color: #78d4b6 }
      &.twitter-service { background-color: #1da1f2 }
      &.twilio-service { background-color: #f22f44 }

      border-radius: .5rem;
      justify-content: flex-end;
      width: 100%;
      height: 150px;
      padding: 3rem 1rem;
      z-index: 0;
      h4 {
        text-align: center;
        color: color(light);
        font-weight: bold;
        padding-bottom: .5rem !important;
      }
      p {
        text-align: center;
        color: color(light);
        font-size: fontSize(s);
      }
    }
  }

  a {
    width: 100%;
  }
}

.getting-started {
  text-align: center;
}
</style>
