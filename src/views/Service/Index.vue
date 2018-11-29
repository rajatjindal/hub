<template>
  <div class="index">
    <section class="hero bg--dark is-medium">
      <div class="hero-body">
        <div class="container">
          <stars-particles />
          <div class="title-container">
            <div class="columns">
              <div class="column is-one-fifth avatar-container">
                <div class="avatar">
                  <img src="@/assets/slack.png" alt="Slack"/>
                </div>
              </div>
              <div class="column is-four-fifths main-head">
                <h1 class="title is-1 text--light" v-if="serviceName">{{ serviceName | capitalize }} service</h1>
                <h1 class="title is-1 text--light" v-else>...</h1>
                <transition name="fade">
                  <h3 v-if="service.description" class="subtitle is-4 text--light">{{service.description | emoji}}</h3>
                  <h3 v-else-if="!service.description && serviceName" class="subtitle is-4 none-found text--light">This service has no description.</h3>
                  <h3 v-else class="subtitle is-4 description">...</h3>
                </transition>
                <div class="service-categories">
                  <services-icon type="popular" light />
                  <services-icon type="messaging" light />
                  <services-icon type="worker" light />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg--darker">
        <div class="info-container">
          <div class="columns is-multiline">
            <div class="column is-full">
              <h4 class="version">Version {{ latestVersion || 'unknown' }} &middot; {{ license || 'No license' }}</h4>
              <p class="publication">Last published 5 minutes ago</p>
            </div>
            <div class="column is-one-third">
              <h5>Monthly usage<span class="float-right">153 users</span></h5>
              <div class="trend">
                <la-cartesian autoresize :width="300" :height="150" :bound="[0]" :data="[{ v: 1 }, { v: 1 }, { v: 1 }, { v: 3 }, { v: 1 }, { v: 3 }, { v: 5 }, { v: 9 }, { v: 5 }, { v: 10 }, { v: 3 }, { v: 5 }]" :padding="0">
                  <defs>
                    <linearGradient id="colorm-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop stop-color="#a100ff" offset="0%" />
                      <stop stop-color="#efefef" offset="100%" />
                    </linearGradient>
                  </defs>
                  <la-line curve :width="2" prop="v" color="url(#colorm-fill)" />
                </la-cartesian>
              </div>
            </div>
            <div class="column is-one-third">
              <h5>Successful builds<span class="float-right">2,567 builds</span></h5>
              <div class="trend">
                <la-cartesian autoresize :width="300" :height="150" :bound="[0]" :data="[{ v: 10 }, { v: 5 }, { v: 7 }, { v: 6 }, { v: 20 }, { v: 15 }, { v: 30 }]" :padding="0">
                  <defs>
                    <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop stop-color="#0e0f12" offset="0%" stop-opacity="0.8" />
                      <stop stop-color="#0e0f12" offset="100%" stop-opacity="0.4" />
                    </linearGradient>
                  </defs>
                  <defs>
                    <linearGradient id="color-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop stop-color="#f72d2d" offset="0%" />
                      <stop stop-color="#ff7900" offset="100%" />
                    </linearGradient>
                  </defs>
                  <la-area fill-color="url(#area-fill)" :width="2" line color="url(#color-fill)" curve prop="v"></la-area>
                </la-cartesian>
              </div>
            </div>
            <div class="column is-one-third">
                <!-- <div id="heatmap" /> -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="section">
      <div class="container breadcrumb-container">
        <div class="columns">
          <div class="column is-full">
            <transition name="fade">
              <nav class="breadcrumb" aria-label="breadcrumbs">
                <ul>
                  <li><router-link :to="{ name: 'hub' }">Hub</router-link></li>
                  <li><router-link :to="{ name: 'services' }">Services</router-link></li>
                  <li v-if="$route.name.includes('service')" class="is-active"><a href="#" @click.stop="" :aria-current="serviceName">{{ serviceName | capitalize }}</a></li>
                  <template v-else>
                    <li><router-link :to="{ name: `service${$route.name === 'guide' ? '' : '_repo'}`, params: ($route.name === 'guide' ? { alias } : { owner, repo }), hash: '' }">{{ serviceName | capitalize }}</router-link></li>
                    <li><router-link :to="{ name: `service${$route.name === 'guide' ? '' : '_repo'}`, params: ($route.name === 'guide' ? { alias } : { owner, repo }), hash: '#actions' }">Actions</router-link></li>
                    <li v-for="(cat, idx) of getHashArray" :key="`breadcrumbs-${cat}`" :class="{ 'is-active': idx === getHashArray.length - 1 }">
                      <a :href="`#${getHash(idx)}`" @click.stop="$router.push({name: $route.name, params: $route.params, hash: `#${getHash(idx)}` })" :aria-current="`${serviceName} guide ${cat}`">{{ cat }}</a>
                    </li>
                  </template>
                </ul>
              </nav>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { ServiceQuery, ServiceByOwnerAndRepoQuery } from '@/plugins/graphql'
import ServicesIcon from '@/components/ServicesIcon'

export default {
  name: 'Integration',
  props: ['repo', 'alias', 'owner'],
  apollo: {
    serviceByAlias: {
      query: ServiceQuery,
      skip: function() {
        return !this.alias
      },
      variables: function() {
        return {
          where: this.alias
        }
      },
      update: function(data) {
        return data.serviceByAlias
      }
    },
    serviceByOwnerAndRepo: {
      query: ServiceByOwnerAndRepoQuery,
      skip: function() {
        return !this.owner && !this.repo
      },
      variables: function() {
        return {
          owner: this.owner,
          repo: this.repo
        }
      },
      update: function(data) {
        return (
          data.allOwners.nodes.length > 0 &&
          data.allOwners.nodes[0].services.nodes.length > 0 &&
          data.allOwners.nodes[0].services.nodes[0]
        )
      }
    }
  },
  data: () => ({
    serviceByAlias: undefined,
    serviceByOwnerAndRepo: undefined,
    startDate: new Date('2018-05-30T12:10:30.407+05:30'),
    endDate: new Date()
  }),
  watch: {
    '$route': function () {
      this.$nextTick(this.onReady)
    },
    serviceByAlias: function (newValue) {
      if (!newValue) this.$router.push('/404')
      else this.onReady()
    },
    serviceByOwnerAndRepo: function(newValue) {
      if (!newValue) this.$router.push('/404')
      else this.onReady()
    }
  },
  methods: {
    onReady: function (callback) {
      if (callback) {
        this.onReadyCallback = callback
      } else {
        if (this.onReadyCallback) {
          this.onReadyCallback()
        }
      }
    },
    getHash: function (idx) {
      let hash = ((this.$route.hash || '').split('#') || ['', ''])[1].split('-')
      hash.splice(idx + 1)
      return hash.join('-')
    }
  },
  computed: {
    service: function() {
      return this.serviceByAlias || this.serviceByOwnerAndRepo || {}
    },
    getHashArray: function () {
      return ((this.$route.hash || '').split('#') || ['', ''])[1].split('-')
    },
    serviceName: function() {
      if (
        !this.service.alias &&
        (!this.service || !this.service.owner)
      ) {
        return ''
      }
      return (
        this.service.alias ||
        `${this.service.owner.username}/${this.service.name}`
      )
    },
    numCommands: function() {
      return Object.keys(this.commands).length
    },
    commands: function() {
      return (
        (this.service &&
          this.service.serviceTags &&
          this.service.serviceTags.nodes &&
          this.service.serviceTags.nodes.length > 0 &&
          this.service.serviceTags.nodes[0].configuration.actions) ||
        {}
      )
    },
    tags: function() {
      return (
        (this.service &&
          this.service.serviceTags &&
          this.service.serviceTags.nodes) ||
        []
      )
    },
    license: function () {
      return ((this.tags && this.tags.length > 0 &&
                this.tags[0].configuration &&
                this.tags[0].configuration.info &&
                this.tags[0].configuration.info.license &&
                this.tags[0].configuration.info.license.name) || undefined)
    },
    latestVersion: function () {
      return ((this.tags && this.tags.length > 0 &&
          this.tags[0].configuration &&
          this.tags[0].configuration.info &&
          this.tags[0].configuration.info.version) || undefined)
    }
  },
  mounted: function () {
    // this.chart = new Chart('#heatmap', {
    //   type: 'heatmap',
    //   data: {
    //     dataPoints: {
    //       '1536761433': 8,
    //       '1534083033': 4,
    //       '1535432233': 2,
    //       '1535639233': 1,
    //       '1536349233': 9,
    //       '1534940333': 5
    //     },
    //     start: this.startDate,
    //     end: this.endDate
    //   },
    //   countLabel: 'crashs',
    //   discreteDomains: 0, // default: 1
    //   colors: ['#ebccff', '#d799ff', '#c466ff', '#b032ff', '#a100ff']
    // })
  },
  components: {
    ServicesIcon
  }
}
</script>

<style lang="scss">
.body-section {
  &:first-child {
    .heading-title {
      margin-top: 0 !important;
    }
  }
  .heading-title {
    margin-top: 1.5rem !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
}

.bg--darker {
  background-color: rgba(darken(color(dark), 10%), .5);
}

.info-container {
  padding: 3rem 2rem;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  color: $white;

  .version {
    padding-bottom: .5rem !important;
  }

  .publication {
    color: gray(400);
  }
}

.float-right {
  float: right;
}

.breadcrumb-container {
  @include breakpoint(m) { height: 3rem }
  padding-top: 1.5rem !important;
  padding-bottom: 0 !important;
}

.trend {
  svg {
    border: 1px solid gray(800);
    border-radius: .25rem;
    padding: 0;
    background-color: rgba(darken(color(dark), 5%), 1);
  }
}

.title-container {
  max-width: 1440px;
  width: 100%;
  padding: 0 2rem !important;
  margin: 0 auto !important;
  z-index: 2;

  .main-head {
    h1, h3 {
      margin-bottom: 0 !important;
      padding-bottom: 1rem !important;
    }
    .service-categories {
      svg + svg {
        margin-left: 1rem;
      }
    }
  }

  .avatar-container {
    display: flex !important;
    align-items: center;
    justify-content: flex-end;
  }

  .avatar {
    width: 100%;
    max-width: 128px;
    height: 128px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $white;
    padding: 0;
    z-index: 1;
    box-shadow: 0 .3rem 2rem .1rem rgba(darken(color(dark), 15%), .5);
    overflow: hidden;
    img {
      padding: 1rem;
    }
    .picture {
      border: .3rem solid $white;
      border-radius: 100%;
      margin: 0;
      width: 128px;
      height: 128px;
      background-size: cover;
      background-position: center center;
    }
  }
}

.toc-commands {
  tbody {
    tr {
      margin-bottom: .5rem;
      &:not(:last-child) {
        border-bottom: 1px solid gray(200);
      }
      td {
        &:first-child {
          padding: 1rem 3rem 1rem 0;
        }
        padding: 1rem 2rem 1rem 0 !important;
        max-width: 20rem;
        @include breakpoint(max s) {
          max-width: 130px;
        }
        @include breakpoint(max m) {
          max-width: 15rem;
        }
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}

.index {
  background-color: #fff;
}

.bordered {
  border: 0.0625rem solid rgba(0, 0, 0, 0.05);
}

.img-collabs {
  border: 3px solid #fff;
  &:not(:first-child) {
    margin-left: -15px;
  }
}

.version-head {
  font-family: Inconsolata, Arial, Verdana, Tahoma, sans-serif;

  &:not(:first-child) {
    margin-top: 20px;
  }
}

.sticky-sidebar {
  position: sticky !important;
  top: 5.5rem !important;
  .sidebar-stick {
    // margin-top: 5rem !important;
  }
}

.sidebar-info {
  font-size: 0.95em;

  .section:not(:first-child) {
    margin-top: 1.2em;
  }

  a:not(:first-child) {
    button {
      margin-top: 10px;
    }
  }

  .links,
  .versions {
    margin-top: 0;
    list-style: none;
    padding-left: 0;

    button:not(:first-child) {
      margin-top: 20px;
    }
  }
  button {
    // text-align: left;
  }
}

.none-found {
  font-size: 0.9em;
  color: #aaa;
}

.body {
  max-width: 800px;

  & > .body-section {

    &:not(:first-child) {
      margin-top: 1.8em;
    }

    p {
      margin: 0;
      font-size: 0.95em;
    }
  }

  .name-container {
    margin-bottom: 1.5em;
    line-height: 2.8em;

    h1 {
      margin-bottom: 0;
    }

    .checkmark {
      margin-left: 0.8em;
      font-size: 2em;
      color: #3e87da;
    }
  }
}
</style>
