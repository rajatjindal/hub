<template>
  <div class="index">
    <section class="hero bg--dark is-medium">
      <div class="hero-body">
        <div class="container">
          <stars-particles />
          <div class="title-container">
            <div class="columns">
              <div class="column is-one-fifth">
                <div class="avatar">
                  <img src="@/assets/slack.png" alt="Slack"/>
                </div>
              </div>
              <div class="column is-four-fifths main-head">
                <h1 class="title is-1 text--light">{{ serviceName | capitalize }} service</h1>
                <transition name="fade">
                  <h3 v-if="service.description" class="subtitle is-4 text--light">{{service.description | emoji}}</h3>
                  <h3 v-else-if="!service.description && serviceName" class="subtitle is-4 none-found text--light">This service has no description.</h3>
                  <!-- <h3 v-else class="loading-shimmer subtitle is-4 description"></h3> -->
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
              <h4>Version 0.1.3 &middot; MIT Licenced</h4>
              <p>Last published 5 minutes ago</p>
            </div>
            <div class="column is-one-third">
              <h5>Monthly usage - 153 users</h5>
              <trend
                :data="[0, 0, 0, 1, 0, 2, 5, 9, 5, 10, 3, 5]"
                :gradient="['#a100ff', '#f72d2d']"
                auto-draw
                smooth />
            </div>
            <div class="column is-one-third">
              <h5>Successful builds - 2,567 builds</h5>
              <trend
                :data="[0, 0, 0, 1, 0, 2, 5, 9, 5, 10, 3, 5]"
                :gradient="['#a100ff', '#f72d2d']"
                auto-draw
                smooth />
            </div>
            <div class="column is-one-third">
                <div id="heatmap" />
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
                  <li><router-link to="/">Hub</router-link></li>
                  <li><router-link to="/services">Services</router-link></li>
                  <li class="is-active"><a href="#" @click.stop="" :aria-current="serviceName">{{ serviceName | capitalize }}</a></li>
                </ul>
              </nav>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <two-column-sidebar>
      <div slot="sidebar" class="sidebar sticky-sidebar">
        <div class="sidebar-info">
          <ul class="section sidebar-stick list-scroll-spy" v-scroll-spy-active v-scroll-spy-link>
            <li><a href="#readme">Readme</a></li>
            <li><a href="#commands">Commands</a></li>
            <li><a href="#similars">Similar apps</a></li>
            <li><a href="#changelog">Changelog</a></li>
          </ul>
        </div>
      </div>
      <div slot="body" class="body" v-scroll-spy="{ offset: 100 }">
        <div class="body-section">
          <h3 class="heading-title title is-3 text-dark" id="readme">Readme</h3>
          <p>The readme of the service</p>
        </div>
        <div class="body-section">
          <h3 class="heading-title title is-3 text-dark" id="commands">Commands (9)</h3>
          <div class="command" v-if="numCommands <= 0 && !serviceName">
            <div class="loading-shimmer name"></div>
          </div>

          <transition name="fade">
            <div v-if="numCommands <= 0 && serviceName" class="none-found">
              This service has no commands.
            </div>
          </transition>

          <transition name="fade">
            <div class="toc-commands-container" v-if="numCommands > 1">
              <table class="table toc-commands">
                <tbody>
                  <tr v-for="(command, name) in commands" :key="name">
                    <td><router-link :to="{ name: 'guide', params: { repo }, hash: `#${name}` }" :href="`#${name}`">{{name}}</router-link></td>
                    <td>{{command.help}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </transition>
        </div>
        <div class="body-section">
          <h3 class="heading-title title is-3 text-dark" id="similars">Similar apps</h3>
          <div class="columns">
            <div class="column is-one-third">
              <a-card>
                <h3>Twitter API</h3>
                <a-button state="link"><font-awesome-icon :icon="['fab', 'github']" /> Github repo</a-button>
                <a-button state="link"><a-logo icon /> Asyncy App</a-button>
              </a-card>
            </div>
            <div class="column is-one-third">
              <a-card>
                <h3>Twitter Bot</h3>
                <a-button state="link"><font-awesome-icon :icon="['fab', 'github']" /> Github repo</a-button>
                <a-button state="link"><a-logo icon /> Asyncy App</a-button>
              </a-card>
            </div>
          </div>
        </div>
        <div class="body-section">
          <h3 class="heading-title title is-3 text-dark" id="changelog">Changelog</h3>
          <h3 class="version-head">0.1.3 <a-badge state="warning" class="text-uppercase">Latest</a-badge></h3>
          <p>
            New methods
            - deprecation of <span class="tag">getElement()</span>
          </p>
          <h3 class="version-head">0.1.2</h3>
          <p>Improvements and bug fixes</p>
          <h3 class="version-head">0.1.1 <a-badge state="danger" class="text-uppercase">Build failed</a-badge></h3>
          <p>New authentication method</p>
        </div>
        <div style="float:right; margin-top: 10px">
          <a-button state="neutral" @click="redirect">Get started</a-button>
        </div>
      </div>
    </two-column-sidebar>
  </div>
</template>

<script>
import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm'
import { ServiceQuery } from '@/plugins/graphql'
import Code from '@/components/Code'
import ServicesIcon from '@/components/ServicesIcon'

export default {
  name: 'Integration',
  props: ['repo', 'alias'],
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
    }
  },
  data: () => ({
    serviceByAlias: undefined,
    startDate: new Date('2018-05-30T12:10:30.407+05:30'),
    endDate: new Date()
  }),
  watch: {
    serviceByAlias: function (newValue) {
      if (!newValue) this.$router.push('/404')
    }
  },
  methods: {
    redirect: function () {
      this.$router.push({ name: 'guide', params: { repo: this.repo } })
    }
  },
  computed: {
    service: function() {
      return this.serviceByAlias || {}
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
    }
  },
  mounted: function () {
    console.log(Chart)
    this.chart = new Chart('#heatmap', {
      type: 'heatmap',
      data: {
        dataPoints: {
          '1536761433': 8,
          '1534083033': 4,
          '1535432233': 2,
          '1535639233': 1,
          '1536349233': 9,
          '1534940333': 5
        },
        start: this.startDate,
        end: this.endDate
      },
      countLabel: 'crashs',
      discreteDomains: 0, // default: 1
      colors: ['#ebccff', '#d799ff', '#c466ff', '#b032ff', '#a100ff']
    })
  },
  components: {
    Code,
    ServicesIcon
  }
}
</script>

<style scoped lang="scss">
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
}

.breadcrumb-container {
  padding-top: 1.5rem;
  padding-bottom: 0;
}

.title-container {
  max-width: 1440px;
  width: 100%;
  padding: 0 2rem;
  margin: 0 auto;
  z-index: 2;

  .main-head {
    h1, h3 {
      margin-bottom: 0;
      padding-bottom: 1rem !important;
    }
    .service-categories {
      svg + svg {
        margin-left: 1rem;
      }
    }
  }

  .avatar {
    width: 200px;
    height: 200px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $white;
    padding: 1rem;
    z-index: 1;
    box-shadow: 0 .3rem 2rem .1rem rgba(darken(color(dark), 15%), .5);
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
        max-width: 20rem;
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
  top: 5.5rem;
  .sidebar-stick {
    // margin-top: 5rem !important;
  }
}

.list-scroll-spy {
  li {
    padding-left: 20px;
    border-left-width: 2px;
    border-left-style: solid;
    border-left-color: transparent;

    &.active {
      border-left-color: #9100e6;
    }

    &:not(:first-child) {
      margin-top: 10px;
    }
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
