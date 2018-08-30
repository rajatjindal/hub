<template>
  <div class="index">
    <div class="hero">
       <hero-background
        :left-image="headerLeft"
        :right-image="headerRight"
        :scale="2.6"
        :left-x="-200"
        :left-y="-70"
        :right-x="-200"
        :right-y="-70"
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
                  <div class="featured tile is-child slack-service"><img :src="slackLogo" alt="Slack"/></div>
                </router-link>
              </div>

              <div class="tile is-parent">
                <router-link :to="`/service/twitter`">
                  <div class="featured tile is-child twitter-service"><img :src="twitterLogo" width="50" alt="Twitter"/></div>
                </router-link>
              </div>

              <div class="tile is-parent">
                <router-link :to="`/service/twilio`">
                  <div class="featured tile is-child twilio-service"><img :src="twilioLogo" alt="Twilio"/></div>
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

        <section class="section getting-started">
          <h2 class="call-to-action">List your service on Asyncy Hub</h2>
          <a-button color="white" @click.native="$emit('open-submit-service-modal')">Submit a service</a-button>
        </section>
      </div>
    </two-column-sidebar>
  </div>
</template>

<script>
import queries from '../utils/graphql';
import ServiceSummary from '../components/ServiceSummary';
import SearchBar from '../components/SearchBar';
import HeroBackground from '../../../node_modules/asyncy-ui-components/dist/HeroBackground';

import slackLogo from '../../assets/slack_logo_text.svg';
import twitterLogo from '../../assets/twitter_logo.svg';
import twilioLogo from '../../assets/twilio_logo_text.svg';

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
      twitterLogo,
      slackLogo,
      twilioLogo,
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
  methods: {
    getTitle(r) {
      if (!r.alias || !r.repo) {
        return '';
      }
      return r.alias || `${r.repo.owner.username}/${r.repo.name}`;
    },
  },
  components: {
    HeroBackground,
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
  position relative
  overflow: hidden;
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
    height 150px
    border-radius 5px
    padding 25px
    font-size 0.9
    font-weight 600
    color white
    display flex
    justify-content center
    align-items center
    transition all 0.2s
    &:hover
      transform scale(1.05, 1.05)

  .slack-service
    background-image url('../../assets/slack_bg.svg')
    background-color #78D4B6

  .twitter-service
    background-image url('../../assets/twitter_bg.svg')
    background-color #1DA1F2

  .twilio-service
    background-image url('../../assets/twilio_bg.svg')
    background-color #F22F44

  a
    width 100%

.getting-started
  text-align center
</style>
