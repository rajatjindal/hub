<template>
  <div class="has-background-light section">
    <a-section
      large-header
      shadowed>
      <template slot="header-left">
        <svg
          width="80px"
          height="80px"
          viewBox="0 0 80 80"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <g
            id="HUB"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd">
            <g
              id="3.Hub---feature_detail-ACTION"
              transform="translate(-154.000000, -150.000000)">
              <g
                id="Group-4-Copy-8"
                transform="translate(154.000000, 150.000000)">
                <rect
                  id="Rectangle"
                  fill="#4A154B"
                  fill-rule="nonzero"
                  x="0"
                  y="0"
                  width="80"
                  height="80"
                  rx="10"/>
                <g
                  id="Group-2"
                  transform="translate(21.728395, 20.740741)">
                  <path
                    id="Fill-15"
                    d="M8.13168724,25.5558674 C8.13168724,27.8991813 6.31168724,29.7991943 4.06584362,29.7991943 C1.82106996,29.7991943 -4.61852778e-14,27.8991813 -4.61852778e-14,25.5558674 C-4.61852778e-14,23.2125536 1.82106996,21.3125406 4.06584362,21.3125406 L8.13168724,21.3125406 L8.13168724,25.5558674 Z"
                    fill="#E01E5A"/>
                  <path
                    id="Fill-17"
                    d="M9.62962963,25.5558674 C9.62962963,23.2125536 11.4496296,21.3125406 13.6954733,21.3125406 C15.9402469,21.3125406 17.7613169,23.2125536 17.7613169,25.5558674 L17.7613169,36.1641845 C17.7613169,38.5074984 15.9402469,40.4075114 13.6954733,40.4075114 C11.4496296,40.4075114 9.62962963,38.5074984 9.62962963,36.1641845 L9.62962963,25.5558674 Z"
                    fill="#E01E5A"/>
                  <path
                    id="Fill-19"
                    d="M14.2297037,8.48654711 C11.9838601,8.48654711 10.1638601,6.58653411 10.1638601,4.24322027 C10.1638601,1.89990643 11.9838601,-0.000106562703 14.2297037,-0.000106562703 C16.4755473,-0.000106562703 18.2955473,1.89990643 18.2955473,4.24322027 L18.2955473,8.48654711 L14.2297037,8.48654711 Z"
                    fill="#36C5F0"/>
                  <path
                    id="Fill-21"
                    d="M14.2297037,10.6083171 C16.4755473,10.6083171 18.2955473,12.5083301 18.2955473,14.8516439 C18.2955473,17.1949578 16.4755473,19.0949708 14.2297037,19.0949708 L4.06509465,19.0949708 C1.82032099,19.0949708 0.000320987654,17.1949578 0.000320987654,14.8516439 C0.000320987654,12.5083301 1.82032099,10.6083171 4.06509465,10.6083171 L14.2297037,10.6083171 Z"
                    fill="#36C5F0"/>
                  <path
                    id="Fill-23"
                    d="M29.9588477,14.8995971 C29.9588477,12.5562833 31.7788477,10.6562703 34.0246914,10.6562703 C36.269465,10.6562703 38.090535,12.5562833 38.090535,14.8995971 C38.090535,17.242911 36.269465,19.142924 34.0246914,19.142924 L29.9588477,19.142924 L29.9588477,14.8995971 Z"
                    fill="#2EB67D"/>
                  <path
                    id="Fill-25"
                    d="M28.4609053,14.8516439 C28.4609053,17.1949578 26.6409053,19.0949708 24.3950617,19.0949708 C22.1502881,19.0949708 20.3292181,17.1949578 20.3292181,14.8516439 L20.3292181,4.24332684 C20.3292181,1.900013 22.1502881,1.77635684e-15 24.3950617,1.77635684e-15 C26.6409053,1.77635684e-15 28.4609053,1.900013 28.4609053,4.24332684 L28.4609053,14.8516439 Z"
                    fill="#2EB67D"/>
                  <path
                    id="Fill-27"
                    d="M24.3937778,31.8246316 C26.6396214,31.8246316 28.4596214,33.7246446 28.4596214,36.0679584 C28.4596214,38.4112723 26.6396214,40.3112853 24.3937778,40.3112853 C22.1479342,40.3112853 20.3279342,38.4112723 20.3279342,36.0679584 L20.3279342,31.8246316 L24.3937778,31.8246316 Z"
                    fill="#ECB22E"/>
                  <path
                    id="Fill-29"
                    d="M24.3715213,29.8375569 C22.1386806,29.8375569 20.3292181,28.1675304 20.3292181,26.1078622 C20.3292181,24.0481941 22.1386806,22.3781676 24.3715213,22.3781676 L34.4762154,22.3781676 C36.709056,22.3781676 38.5185185,24.0481941 38.5185185,26.1078622 C38.5185185,28.1675304 36.709056,29.8375569 34.4762154,29.8375569 L24.3715213,29.8375569 Z"
                    fill="#ECB22E"/>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </template>
      <template slot="header-centered">
        <h5 class="is-size-4 has-text-weight-bold has-text-dark">{{ serviceName || '...' }} Service</h5>
        <span class="is-size-8 has-text-weight-bold has-text-uppercase has-text-gray-3">{{ service.pullUrl }}</span>
      </template>
      <template slot="header-right">
        <a-input
          :icon-right="['a-icon', { icon: 'search' }]"
          background="light"
          disabled
          placeholder="SEARCH DOCS"
        />
      </template>
      <!-- <template slot="header-divider-content-right">
      </template> -->
      <p class="service-license">Version 0.1.3 - MIT LICENSED</p>
      <div class="columns service-stats">
        <div class="column is-one-third">
          <p class="is-size-8 has-text-gray-3 has-text-weight-bold has-text-uppercase">Service Used in N Stories</p>
          <div class="image is-3by2">
            <img
              src="@/assets/img/services/metrics/1.png"
              srcset="@/assets/img/services/metrics/1@2x.png 2x, @/assets/img/services/metrics/1@3x.png 3x"
              alt="services used">
          </div>
        </div>
        <div class="column is-one-third">
          <p class="is-size-8 has-text-gray-3 has-text-weight-bold has-text-uppercase">Health</p>
          <div class="image is-3by2">
            <img
              src="@/assets/img/services/metrics/2.png"
              srcset="@/assets/img/services/metrics/2@2x.png 2x, @/assets/img/services/metrics/2@3x.png 3x"
              alt="health">
            <figcaption class="overlay-space-evenly">
              <h5 class="is-size-7 has-text-dark has-text-weight-bold has-text-uppercase">Coming Soon!</h5>
              <a-button url="//asyncy.com/blog">Read our Blog</a-button>
            </figcaption>
          </div>
        </div>
        <div class="column is-one-third">
          <p class="is-size-8 has-text-gray-3 has-text-weight-bold has-text-uppercase">Steps</p>
          <div class="image is-3by2">
            <img
              src="@/assets/img/services/metrics/3.png"
              srcset="@/assets/img/services/metrics/3@2x.png 2x, @/assets/img/services/metrics/3@3x.png 3x"
              alt="steps">
          </div>
        </div>
      </div>
    </a-section>
    <a-section>
      <template slot="header-left">
        <a-breadcrumbs :items="breadcrumbs" />
      </template>
      <div
        slot="sidebar"
        class="sticky topics"
      >
        <ul
          v-scroll-spy-active
          v-scroll-spy-link
          v-if="$route.name.includes('service')"
          class="topics-list">
          <li class="topic-item"><a href="#readme">Description</a></li>
          <li class="topic-item"><a href="#actions">Actions</a></li>
          <!-- <li><a href="#similars">Similar apps</a></li> -->
          <li class="topic-item"><a href="#versions">Versions</a></li>
          <li class="topic-item"><a href="#pricing">Pricing</a></li>
        </ul>
        <ul
          v-else
          class="topics-list">
          <template v-for="(command, name) in commands">
            <li
              :key="`list-command-${name}`"
              :class="['topic-item', { active: $route.hash === `#${name}`}]">
              <a
                :href="`#${name}`"
                :title="name">{{ name }}</a>
            </li>
            <template v-if="command.events">
              <li
                v-for="(event, ename) in command.events"
                :key="`list-subcommand-${ename}`"
                :class="['topic-item', 'sub', {active: $route.hash.includes(`#${name}-${ename}`)}]">
                <a
                  :href="`#${name}-${ename}`"
                  :title="ename">{{ ename }}</a>
              </li>
            </template>
          </template>
        </ul>
      </div>
      <transition name="fade">
        <router-view />
      </transition>
    </a-section>
  </div>
</template>

<script>
import { ServiceQuery, ServiceByOwnerAndRepoQuery } from '@/plugins/graphql'
import ASection from '@/components/ASection'

export default {
  name: 'OneServicePage',
  components: { ASection },
  provide () {
    return {
      commands: () => this.commands,
      tags: () => this.tags,
      serviceName: () => this.serviceName,
      numCommands: () => this.numCommands,
      alias: () => this.alias,
      owner: () => this.owner,
      repo: () => this.repo,
      onReady: () => this.onReady
    }
  },
  props: {
    repo: {
      type: String,
      default: undefined
    },
    alias: {
      type: String,
      default: undefined
    },
    owner: {
      type: String,
      default: undefined
    }
  },
  apollo: {
    serviceByAlias: {
      query: ServiceQuery,
      skip: function () {
        return !this.alias
      },
      variables: function () {
        return {
          where: this.alias
        }
      },
      update: function (data) {
        return data.serviceByAlias
      }
    },
    serviceByOwnerAndRepo: {
      query: ServiceByOwnerAndRepoQuery,
      skip: function () {
        return !this.owner && !this.repo
      },
      variables: function () {
        return {
          owner: this.owner,
          repo: this.repo
        }
      },
      update: function (data) {
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
  computed: {
    service: function () {
      return this.serviceByAlias || this.serviceByOwnerAndRepo || {}
    },
    breadcrumbs: function () {
      let arr = [{ name: 'Hub', to: { name: 'home' } }, { name: 'Services', to: { name: 'services' } }]
      if (this.$route.name.includes('service')) arr.push({ name: this.serviceName })
      else {
        arr.push({ name: this.serviceName, to: { name: this.$route.name === 'guide' ? 'service' : 'service_repo', params: (this.$route.name === 'guide' ? { alias: this.alias } : { owner: this.owner, repo: this.repo }), hash: '' } })
        arr.push({ name: 'Actions', to: { name: this.$route.name === 'guide' ? 'service' : 'service_repo', params: (this.$route.name === 'guide' ? { alias: this.alias } : { owner: this.owner, repo: this.repo }), hash: '#actions' } })
        for (let i = 0; i < this.getHashArray.length; i++) {
          arr.push({ name: this.getHashArray[i], to: { name: this.$route.name, params: this.$route.params, hash: `#${this.getHash(i)}` } })
        }
      }
      return arr
    },
    getHashArray: function () {
      return (((this.$route.hash[0] === '#' ? this.$route.hash : `#${this.$route.hash}`) || '').split('#') || ['', ''])[1].split('-')
    },
    serviceName: function () {
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
    numCommands: function () {
      return Object.keys(this.commands).length
    },
    commands: function () {
      return (
        (this.service &&
          this.service.serviceTags &&
          this.service.serviceTags.nodes &&
          this.service.serviceTags.nodes.length > 0 &&
          this.service.serviceTags.nodes[0].configuration.actions) ||
        {}
      )
    },
    tags: function () {
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
  watch: {
    '$route': function () {
      this.$nextTick(this.onReady)
    },
    serviceByAlias: function (newValue) {
      if (!newValue) this.$router.push('/404')
      else this.onReady()
    },
    serviceByOwnerAndRepo: function (newValue) {
      if (!newValue) this.$router.push('/404')
      else this.onReady()
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
  methods: {
    onReady: function (callback) {
      if (callback) {
        this.onReadyCallback = callback
      } else {
        if (this.onReadyCallback) {
          this.$nextTick().then(() => {
            this.onReadyCallback()
          })
        }
      }
    },
    getHash: function (idx) {
      let hash = ((this.$route.hash || '').split('#') || ['', ''])[1].split('-')
      hash.splice(idx + 1)
      return hash.join('-')
    }
  }
}
</script>

<style lang="scss">
.service-license {
  font-size: nth($sizes, 7);
  color: $dark;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 3rem;
}

.service-stats {
  p {
    margin-bottom: .5rem;
  }
}

.overlay-space-evenly {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
}

.sticky {
  position: sticky;
  &.topics {
    top: 2rem;
  }
}
</style>
