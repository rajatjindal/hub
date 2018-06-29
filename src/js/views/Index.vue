<template>
  <div class="index">
    <div class="hero">
       <hero-background
        :left-image="headerLeft"
        :right-image="headerRight"
        :scale="0.6"
        :left-x="-320"
        :left-y="-60"
        :right-x="-85"
        :right-y="-60"
      />
      <h1 class="hero-header">Asyncy Hub</h1>
      <p class="subtitle">Service discovery and marketplace for Asyncy</p>
      <div class="search-bar-container">
        <div class="field">
          <div class="control">
            <search-bar/>
          </div>
        </div>
      </div>
      <p class="help-message">Try topic:social, topic:machine-learning or stars:>100</p>
    </div>

    <two-column-sidebar>
      <topics-list v-model="topics" slot="sidebar" />
      <div slot="body">
        <section class="section">
          <h2 class="section-header">Featured services</h2>
          <div class="featured-services section-body">
            <div class="tile is-ancestor">
              <div class="tile is-parent">
                <router-link :to="`/service/slack`">
                  <div class="featured tile is-child slack-service">Slack</div>
                </router-link>
              </div>

              <div class="tile is-parent">
                <router-link :to="`/service/twitter`">
                  <div class="featured tile is-child twitter-service">Twitter</div>
                </router-link>
              </div>

              <div class="tile is-parent">
                <router-link :to="`/service/twilio`">
                  <div class="featured tile is-child twilio-service">Twilio</div>
                </router-link>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-header">Recently added</h2>
          <div class="section-body">
            <div class="tile is-ancestor">
              <transition-group name="fade" tag="div" class="tile is-parent is-vertical">
                <div v-for="(r, index) in data.recentServices.slice(0, 3)" class="tile is-child" :key="r.alias || index">
                  <service-summary :title="r.alias" :description="r.description" :tags="r.topics"></service-summary>
                </div>
              </transition-group>
              <transition-group name="fade" tag="div" class="tile is-parent is-vertical">
                <div v-for="(r, index) in data.recentServices.slice(3, 6)" class="tile is-child" :key="r.alias || index">
                  <service-summary :title="r.alias" :description="r.description" :tags="r.topics"></service-summary>
                </div>
              </transition-group>
            </div>
          </div>
        </section>

        <section class="section getting-started">
          <h2 class="call-to-action">List your service on Asyncy Hub</h2>
          <a-button color="white">Submit a service</a-button>
        </section>
      </div>
    </two-column-sidebar>
  </div>
</template>

<script>
import queries from '../utils/graphql';
import ServiceSummary from '../components/ServiceSummary';
import SearchBar from '../components/SearchBar';

import headerLeft from '../../../node_modules/asyncy-ui-components/assets/images/home_header_left.svg';
import headerRight from '../../../node_modules/asyncy-ui-components/assets/images/home_header_right.svg';

export default {
  name: 'index',
  apollo: {
    data: {
      query: queries.INDEX_QUERY,
      update(data) {
        return {
          recentServices: data.recentlyAddedServices.nodes,
        };
      },
    },
  },
  data() {
    return {
      headerLeft,
      headerRight,
      data: {
        recentServices: [{}, {}, {}, {}, {}, {}],
      },
    };
  },
  computed: {
    topics() {
      return this.data.recentServices.map(s => s.topics);
    },
  },
  components: {
    ServiceSummary,
    SearchBar,
  },
};
</script>

<style scoped lang="styl">
.hero-header
  font-size 2.8em

.subtitle
  display: block;
  font-size: 1.15em;
  margin-top: 1.5em;
  margin-bottom: 1.5em;

.help-message
  font-size: 0.9em;
  color: #ccc;

ul
  list-style: none;
  padding-left: 0;
  line-height: 2em;

.section
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #ccc;

  .section-header
    margin-bottom 1.4em

.hero
  overflow: auto;
  padding: 28px 25px 50px 25px;
  color: white;
  background: #111;

  .search-bar-container
    max-width: 580px;
    margin: 0 auto;

.columns
  max-width: 1100px;
  margin: 0 auto;
  margin-top: 1em;
  text-align: left;

.call-to-action
  font-size 1.9em
  line-height 1.4em
  margin-bottom 0.8em

.featured-services
  .featured
    width 100%
    height 150px
    border-radius 5px
    padding 25px
    font-size 0.9
    font-weight 600
    color white
    display flex
    justify-content center
    align-items center

  .slack-service
    background-color #573753

  .twitter-service
    background-color #1DA1F2

  .twilio-service
    background-color #F22F44

  a
    width 100%

.getting-started
  text-align center
</style>
