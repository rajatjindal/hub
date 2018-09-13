<template>
  <div id="guide">
    <div class="hero">
      <transition name="fade">
        <h1 v-if="serviceName" class="display-1">Guide {{ serviceName | capitalize }}</h1>
      </transition>
      <h1 v-if="!serviceName" class="loading-shimmer alias"></h1>
      <p class="subtitle">The complete guide</p>
    </div>
    <two-column-sidebar>
      <div slot="sidebar" class="sidebar sticky-sidebar">
        <div class="sidebar-info">
          <div class="section">
            <transition name="fade">
              <div class="links">
                <ol class="breadcrumb bg-white bordered">
                  <li class="breadcrumb-item"><router-link to="/">Hub</router-link></li>
                  <li class="breadcrumb-item"><router-link to="/integration/twitter">{{ serviceName }}</router-link></li>
                  <li class="breadcrumb-item active" aria-current="guide">Guide</li>
                </ol>
              </div>
            </transition>
            <transition name="fade">
              <div class="links">
                <a-button type="link"><font-awesome-icon :icon="['fab', 'github']" brand /> Github repo</a-button>
                <a-button type="link"><font-awesome-icon :icon="['fab', 'docker']" brand /> Docker hub</a-button>
              </div>
            </transition>
          </div>

          <ul class="section list-scroll-spy" v-scroll-spy-active v-scroll-spy-link>
            <li><a href="#quick">Quick Start</a></li>
            <li><a href="#commands">Commands</a></li>
          </ul>
        </div>
      </div>
      <div slot="body" class="body" v-scroll-spy>
        <div class="body-section">
          <h3 class="heading-title text-dark" id="quick">Quick Start</h3>
          <p>Register your app :</p>
          <Code lang="bash">asyncy credentials setup twitter</Code>
          <p>Or add the constants manually:</p>
          <Code lang="coffeescript">asyncy config add MY_VAR TOKEN
asyncy config add MY_VAR2 TOKEN2</Code>
        </div>
        <div class="body-section">
          <h3 class="heading-title text-dark" id="commands">Commands</h3>

          <transition-group name="fade" tag="div">
            <div v-for="(command, name) in commands" class="command" :key="name">
              <a :id="name" :href="`#${name}`" :name="name"><span class="command-name">{{name}}</span></a>

              <div class="section">
                <a-tabs center bold tabShape="links" class="flex-column flex-md-row">
                  <a-card shadow>
                    <a-tab-pane title="Example">
                      <p v-if="command.help">{{command.help}}</p>
                      <Code v-if="!command.events" lang="coffeescript"><template v-if="!command.run">result = </template>{{ serviceName }} {{ name }}<template v-for="(arg, name) in command.arguments" v-if="arg.required"> {{ name }}:[{{ arg.type }}]</template><template v-if="command.run"> as result
  ...</template></Code>
                      <Code v-if="command.events" lang="coffeescript">{{ serviceName }} {{ name }} as client <template v-for="(val, key) in command.events">
    when client {{ key }} <template v-for="(val, key) in val.arguments">{{key}}:[{{val.type}}] </template>as result
      ...</template></Code>
                    </a-tab-pane>

                    <a-tab-pane v-if="command.arguments" title="Arguments">
                      <div class="arguments-table-container">
                        <table class="table is-bordered">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Type</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(arg, name) in command.arguments" :key="name">
                              <td><code class="arg">{{name}}</code></td>
                              <td class="type"><code class="arg">{{arg.type}}</code></td>
                              <td class="description">
                                <span v-if="arg.required" class="required">Required. </span>
                                <span v-if="arg.default">(Default: <code class="arg">{{arg.default}}</code>) </span>
                                <span v-if="arg.help">{{arg.help}}</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </a-tab-pane>

                    <a-tab-pane v-if="command.events" title="Events">
                      <div class="arguments-table-container">
                        <table class="table is-bordered">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              <template v-for="(event, name) in command.events">
                                <tr :key="name">
                                  <td><code class="arg">{{name}}</code></td>
                                  <td class="description">
                                    <span v-if="event.required" class="required">Required. </span>
                                    <span v-if="event.default">(Default: <code class="arg">{{event.default}}</code>) </span>
                                    <span v-if="event.help">{{event.help}}</span>
                                  </td>
                                </tr>
                                <tr v-if="event.arguments" :key="`event-${name}-args-list`">
                                  <td colspan="2">
                                    <div class="subtitle">Arguments</div>
                                    <div class="arguments-table-container">
                                      <table class="table is-bordered">
                                        <thead>
                                          <tr>
                                            <th>Name</th>
                                            <th>Type</th>
                                            <th>Description</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr v-for="(arg, name) in event.arguments" :key="name">
                                            <td><code class="arg">{{name}}</code></td>
                                            <td class="type"><code class="arg">{{arg.type}}</code></td>
                                            <td class="description">
                                              <span v-if="arg.required" class="required">Required. </span>
                                              <span v-if="arg.default">(Default: <code class="arg">{{arg.default}}</code>) </span>
                                              <span v-if="arg.help">{{arg.help}}</span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </template>
                            </tbody>
                        </table>
                      </div>
                    </a-tab-pane>

                    <a-tab-pane v-if="command.output && command.output.type" title="Output">
                      <p>Returns output of type <code>{{command.output.type}}</code>.</p>
                    </a-tab-pane>
                  </a-card>
                </a-tabs>
              </div>
            </div>
          </transition-group>

          <div class="section">
            <hr />
            <a-progress type="primary" :value="90" label="90% found this helpful" />
            <p>Did you find this helpful ?</p>
            <a-button type="neutral">Yes</a-button>
            <a-button type="neutral">No</a-button>
          </div>
        </div>
      </div>
    </two-column-sidebar>
  </div>
</template>

<script>
import verifiedIcon from '@/assets/verified.svg'
import { ServiceQuery } from '@/plugins/graphql'
import Code from '@/components/Code'

export default {
  name: 'Guide',
  props: {
    repo: {
      type: String,
      default: '',
      required: true
    }
  },
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
    verifiedIcon
  }),
  watch: {
    serviceByAlias: function (newValue) {
      if (!newValue) this.$router.push('/404')
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

.sticky-sidebar {
  position: sticky;
  top: 50px;
}

.bordered {
  border: 0.0625rem solid rgba(0, 0, 0, 0.05);
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

  .links:not(:first-child) {
    margin-top: 20px;
  }

  .links:first-child,
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

.relative {
  position: relative;
}

.none-found {
  font-size: 0.9em;
  color: #aaa;
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

h3#commands {
  margin-top: 40px;
}

.body {
  max-width: 800px;

  & > .body-section {
    // margin-top: 3em;

    p.infos {
      margin-top: 20px;
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

  $colors: #001fff, #2de5ea, #86e028, #ffce00, #ff7900, #f72d2d, #ff107d;

  @for $index from 1 to length($colors) {
    .command {
      &:nth-of-type(#{length($colors)}n + #{$index}) .command-name:before {
        color: nth($colors, $index);
      }
    }
  }

  .command {
    margin-top: 1.2em;
    margin-bottom: 3em;

    .section {
      margin-top: 1.5em;
    }

    .subtitle {
      font-size: 0.9em;
      color: #999;
    }

    .section-event {
      margin-top: 1.25em;
    }

    .command-name {
      color: #111;
      margin-top: 0.8em;
      font-size: 26px;

      &::before {
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica,
          Arial, sans-serif;
        font-weight: 600;
        content: "# ";
        margin-left: -22px;
        opacity: 0.4;
        transition: opacity 0.2s;
      }

      &:hover {
        &::before {
          opacity: 0.7;
        }
      }
    }
  }

  .toc-commands-container {
    width: calc(100% - 24px);
    overflow: auto;
    margin-bottom: 48px;

    @include breakpoint(max $bp-m) {
      width: calc(100vw - 24px);
    }
  }

  .toc-commands {
    min-width: 380px;
    max-width: 510px;
    font-size: 0.9em;

    tr:not(:last-child) {
      border-bottom: 1px solid #979797;
    }

    td {
      max-width: 450px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    & td:first-child {
      padding-right: 2em;
      padding-left: 0px;
    }
  }

  .arg {
    border-radius: 3px;
    padding: 4px 12px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    word-break: keep-all;
  }

  .arguments-table-container {
    width: calc(100% - 24px);
    overflow: auto;
    padding-top: 0.4em;

    @include breakpoint(max $bp-m) {
      width: calc(100vw - 24px);
    }

    .required {
      font-weight: 500;
    }

    table {
      width: 100%;
      font-size: 0.95em;

      th {
        font-weight: 500;
      }

      .type {
        width: 1px;
        white-space: nowrap;
      }

      .description {
        min-width: 320px;
      }
    }
  }

}
</style>
