<template>
  <div>
    <div class="hero">
      <h1 class="display-1">{{ serviceName | capitalize }} service</h1>
      <transition name="fade">
        <p v-if="service.description" class="subtitle">{{service.description | emoji}}</p>
        <p v-else-if="!service.description && serviceName" class="subtitle none-found">This service has no description.</p>
        <p v-else class="loading-shimmer subtitle description"></p>
      </transition>
    </div>
    <two-column-sidebar>
      <div slot="sidebar" class="sidebar sticky-sidebar">
        <div class="sidebar-info">
          <div class="section">
            <transition name="fade">
              <div class="links">
                <ol class="breadcrumb bg-white bordered">
                  <li class="breadcrumb-item"><router-link to="/">Hub</router-link></li>
                  <li class="breadcrumb-item active" :aria-current="serviceName">{{ serviceName }}</li>
                </ol>
              </div>
            </transition>
          </div>

          <ul class="section list-scroll-spy" v-scroll-spy-active v-scroll-spy-link>
            <li><a href="#readme">Readme</a></li>
            <li><a href="#commands">Commands</a></li>
            <li><a href="#similars">Similar apps</a></li>
            <li><a href="#metrics">Metrics</a></li>
            <li><a href="#changelog">Changelog</a></li>
          </ul>
        </div>
      </div>
      <div slot="body" class="body" v-scroll-spy>
        <div class="body-section">
          <h3 class="heading-title text-dark" id="readme">Readme</h3>
          <p>The readme of the service</p>
        </div>
        <div class="body-section">
          <h3 class="heading-title text-dark" id="commands">Commands (9)</h3>
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
          <h3 class="heading-title text-dark" id="similars">Similar apps</h3>
          <div class="columns">
            <div class="column is-one-third">
              <a-card>
                <h3>Twitter API</h3>
                <a-button type="link"><font-awesome-icon :icon="['fab', 'github']" /> Github repo</a-button>
                <a-button type="link"><img src="@/assets/logo.svg" width="12" style="position: relative; top: -4px" /> Asyncy App</a-button>
              </a-card>
            </div>
            <div class="column is-one-third">
              <a-card>
                <h3>Twitter Bot</h3>
                <a-button type="link"><font-awesome-icon :icon="['fab', 'github']" /> Github repo</a-button>
                <a-button type="link"><img src="@/assets/logo.svg" width="12" style="position: relative; top: -4px" /> Asyncy App</a-button>
              </a-card>
            </div>
          </div>
        </div>
        <div class="body-section">
          <h3 class="heading-title text-dark" id="metrics">Metrics</h3>
          <div class="columns">
            <div class="column is-one-third">
              <h6>Monthly usage</h6>
              <a-card>
                <trend
                  :data="[0, 0, 0, 1, 0, 2, 5, 9, 5, 10, 3, 5]"
                  :gradient="['#a100ff', '#f72d2d']"
                  auto-draw
                  smooth />
              </a-card>
            </div>
            <div class="column is-one-third">
              <h6>Successful builds</h6>
              <a-card>
                <trend
                  :data="[3, 1, 5, 1, 2, 2, 5, 9, 5, 10, 3, 5]"
                  :gradient="['#86e028', '#f72d2d']"
                  auto-draw
                  smooth />
              </a-card>
            </div>
            <div class="column">
              <h6>Licence</h6>
              <a-card>
                <h3>MIT</h3>
              </a-card>
            </div>
            <div class="column">
              <h6>Version</h6>
              <a-card>
                <h3>0.1.3</h3>
              </a-card>
            </div>
            <div class="column">
              <h6>Last publish</h6>
              <a-card>
                <h3>A few minutes ago</h3>
              </a-card>
            </div>
            <div class="column">
              <h6>Collaborators</h6>
              <a-card>
                <img v-lazy="'https://s.gravatar.com/avatar/1e944f9462beb7b9ee303d389c14f154?size=50&default=retro'" class="img-fluid rounded-circle img-collabs" />
                <img v-lazy="'https://s.gravatar.com/avatar/1e944f9462beb7b9ee303d389c14f154?size=50&default=retro'" class="img-fluid rounded-circle img-collabs" />
                <img v-lazy="'https://s.gravatar.com/avatar/1e944f9462beb7b9ee303d389c14f154?size=50&default=retro'" class="img-fluid rounded-circle img-collabs" />
              </a-card>
            </div>
            <div class="column is-full">
              <h6>Crashs</h6>
              <a-card body-classes="no-padding">
                <div id="heatmap" />
              </a-card>
            </div>
          </div>
        </div>
        <div class="body-section">
          <h3 class="heading-title text-dark" id="changelog">Changelog</h3>
          <h3 class="version-head">0.1.3 <a-badge type="warning" class="text-uppercase">Latest</a-badge></h3>
          <p>
            New methods
            - deprecation of <span class="tag">getElement()</span>
          </p>
          <h3 class="version-head">0.1.2</h3>
          <p>Improvements and bug fixes</p>
          <h3 class="version-head">0.1.1 <a-badge type="danger" class="text-uppercase">Build failed</a-badge></h3>
          <p>New authentication method</p>
        </div>
        <div style="float:right; margin-top: 10px">
          <a-button type="neutral" @click="redirect">Get started</a-button>
        </div>
      </div>
    </two-column-sidebar>
  </div>
</template>

<script>
import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm'
import { ServiceQuery } from '@/plugins/graphql'
import Code from '@/components/Code'

export default {
  name: 'Integration',
  props: ['repo'],
  apollo: {
    serviceByAlias: {
      query: ServiceQuery,
      skip: function() {
        return !this.repo
      },
      variables: function() {
        return {
          where: this.repo
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
        (!this.service.repo || !this.service.repo.owner)
      ) {
        return ''
      }
      return (
        this.service.alias ||
        `${this.service.repo.owner.username}/${this.service.repo.name}`
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
          this.service.serviceTags.nodes[0].configuration.commands) ||
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
    Code
  }
}
</script>

<style scoped lang="scss">

.hero {
  position: relative;
  overflow: hidden;
  padding: 4em 5em;
  background: #eeeeee;
  z-index: 1;
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
  position: sticky;
  top: 50px;
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
