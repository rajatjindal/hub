<template>
  <three-column-sidebar right-class="right-dark-sidebar" sidebar-class="sidebar-dark-shadow" main-class="guide-main-content">
    <div slot="sidebar" class="sidebar sticky-sidebar">
      <div class="sidebar-info">
        <ul class="section sidebar-stick list-scroll-spy">
          <template v-for="(command, name) in $parent.commands">
            <li :key="`list-command-${name}`" :class="{ active: $route.hash === `#${name}`}">
              <a :href="`#${name}`" :title="name">{{ name }}</a>
            </li>
            <li v-if="command.events" v-for="(event, ename) in command.events" :key="`list-subcommand-${ename}`" :class="{ 'sub': true, active: $route.hash.includes(`#${name}-${ename}`) }">
              <a :href="`#${name}-${ename}`" :title="ename">{{ ename }}</a>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <template v-for="(command, name) in $parent.commands">
      <div slot="body" class="body" :key="`body-${name}`">
        <transition-group name="fade" tag="div" class="command body-section">
          <template v-for="(event, ename) in command.events">
            <template v-if="event.output && event.output.commands">
              <div v-if="$route.hash === `#${name}-${ename}-${cname}`" v-for="(command, cname) in event.output.commands" :key="`container-${name}-event-${ename}-command-${cname}`">
                <h1 class="command-header">
                  <span class="command-name title is-1">
                    <span class="command-name-link" @click="$router.replace({ name: $route.name, params: $route.params, hash: `#${name}`})">{{ name }}</span> -
                    <span class="command-name-link" @click="$router.replace({ name: $route.name, params: $route.params, hash: `#${name}-${ename}`})">{{ ename }}</span> -
                    <span>{{ cname }}</span>
                  </span>
                  <a-badge state="dark" class="text--light command-tag">action</a-badge>
                </h1>
                <h4>Description</h4>
                <span v-if="command.help">{{command.help}}</span>
                <h4>Arguments</h4>
                <div v-if="command.arguments" class="arguments-table-container">
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
                        <td class="type"><i>{{arg.type}}</i></td>
                        <td class="description">
                          <span v-if="arg.required" class="required">Required. </span>
                          <span v-if="arg.default">(Default: <code class="arg">{{arg.default}}</code>) </span>
                          <span v-if="arg.help">{{arg.help}}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </template>
            <div :key="`container-${name}-event-${ename}`" v-if="$route.hash === `#${name}-${ename}`">
              <h1 class="command-header">
                <span class="command-name title is-1">
                  <span class="command-name-link" @click="$router.replace({ name: $route.name, params: $route.params, hash: `#${name}`})">{{ name }}</span> -
                  <span>{{ ename }}</span>
                </span>
                <a-badge state="blue" class="text--light command-tag">event</a-badge>
              </h1>
              <h4 v-if="event.required || event.default || event.help">Description</h4>
              <p v-if="event.required || event.default || event.help">
                <span v-if="event.required" class="required">Required. </span>
                <span v-if="event.default">(Default: <code class="arg">{{event.default}}</code>) </span>
                <span v-if="event.help">{{event.help}}</span>
              </p>
              <h4 v-if="event.arguments">Arguments</h4>
              <div v-if="event.arguments" class="arguments-table-container">
                <table class="table is-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(arg, name) in event.arguments" :key="`event-${ename}-arguments-${name}`">
                      <td><code class="arg">{{name}}</code></td>
                      <td class="type"><i>{{arg.type}}</i></td>
                      <td class="description">
                        <span v-if="arg.required" class="required">Required. </span>
                        <span v-if="arg.default">(Default: <code class="arg">{{arg.default}}</code>) </span>
                        <span v-if="arg.help">{{arg.help}}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <template v-if="event.output">
                <h4>Output</h4>
                <p>Returns output of type <code>{{ event.output.type }}</code>.</p>
                <h4 v-if="event.output.help">Description</h4>
                <p v-if="event.output.help">{{event.output.help}}</p>
                <h4 v-if="event.output.commands">Commands</h4>
                <ul v-if="event.output.commands">
                  <li v-for="(command, cname) in event.output.commands" :key="`event-${ename}-commands-list-${cname}`">
                    <a-button state="neutral" outline @click.stop="$router.push({ name: $route.name, params: $route.params, hash: `#${name}-${ename}-${cname}`})">{{ cname }}</a-button>
                  </li>
                </ul>
                <h4 v-if="event.output.properties">Properties</h4>
                <div v-if="event.output.properties" class="arguments-table-container">
                  <table class="table is-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(arg, name) in event.output.properties" :key="`event-${ename}-output-properties-${name}`">
                        <td><code class="arg">{{name}}</code></td>
                        <td class="type"><i>{{arg.type}}</i></td>
                        <td class="description">
                          <span v-if="arg.required" class="required">Required. </span>
                          <span v-if="arg.default">(Default: <code class="arg">{{arg.default}}</code>) </span>
                          <span v-if="arg.help">{{arg.help}}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </div>
          </template>
          <div :key="`container-${name}`" v-if="$route.hash === `#${name}`">
            <h1 class="command-header">
              <span class="command-name title is-1">{{ name }}</span>
              <a-badge :state="command.events ? 'primary' : 'orange'" class="text--light command-tag">{{ command.events ? 'event-based' : 'command' }}</a-badge>
            </h1>

            <div class="section">
              <div>
                <h3>Description</h3>
                <p v-if="command.help">{{ command.help }}</p>
              </div>
              <div v-if="command.arguments">
                <h3>Arguments</h3>
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
              </div>
              <div v-if="command.events">
                <h3>Events</h3>
                <ul>
                  <li v-for="(event, ename) in command.events" :key="`command-${name}-event-list-${ename}`">
                    <a-button state="neutral" outline @click.stop="$router.push({ name: $route.name, params: $route.params, hash: `#${name}-${ename}`})">{{ ename }}</a-button>
                  </li>
                </ul>
                  <!-- <a-card  light shadow class="argument-card">
                    <div slot="header">
                      <h2>{{ ename }}</h2>
                      <small>
                        <span v-if="event.required" class="required">Required. </span>
                        <span v-if="event.default">(Default: <code class="arg">{{event.default}}</code>) </span>
                        <span v-if="event.help">{{event.help}}</span>
                      </small>
                    </div>
                  <a-window lang="coffeescript">{{ $parent.serviceName }} {{ name }} as client
      when client {{ ename }} <template v-for="(val, key) in event.arguments">{{key}}:[{{val.type}}] </template>as result
        ...</a-window>
                    <h3 v-if="event.arguments">Arguments</h3>
                    <ul v-if="event.arguments">
                      <li v-for="(arg, aname) in event.arguments" :key="'event-' + name + '-arg-' + aname">
                        <div class="columns is-mobile">
                          <div class="column is-one-fifth">
                            <code class="arg">{{ aname }}</code>
                          </div>
                          <div class="column is-one-fifth">
                            <i>{{ arg.type }}</i>
                          </div>
                          <div class="column is-three-fifths">
                            <span v-if="arg.required" class="required">Required. </span>
                            <span v-if="arg.default">(Default: <code class="arg">{{arg.default}}</code>) </span>
                            <span v-if="arg.help">{{arg.help}}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div class="columns is-centered">
                      <div class="column text--center">
                        <a-button state="primary" outline>View Output actions</a-button>
                      </div>
                    </div> -->
                    <!-- <h3 v-if="event.output.commands">Commands</h3>
                    <ul v-if="event.output.commands">
                      <li v-for="(arg, cname) in event.output.commands" :key="'event-' + name + '-command-' + cname">
                        <div class="columns is-mobile">
                          <div class="column is-one-fifth">
                            <code class="arg">{{ cname }}</code>
                          </div>
                          <div class="column is-one-fifth">
                            <span v-if="arg.help">{{arg.help}}</span>
                          </div>
                          <div class="column is-three-fifths">
                            <ul v-if="arg.arguments">
                              <li v-for="(arg, agname) in arg.arguments" :key="'event-' + name + '-command-' + cname + '-arg-' + agname">
                                <div class="columns is-mobile">
                                  <div class="column is-two-fifth">
                                    <code class="arg">{{ agname }}</code>
                                  </div>
                                  <div class="column is-three-fifths">
                                    <span>[<i>{{ arg.type }}</i>] </span>
                                    <span v-if="arg.required" class="required">Required. </span>
                                    <span v-if="arg.default">(Default: <code class="arg">{{arg.default}}</code>) </span>
                                    <span v-if="arg.help">{{arg.help}}</span>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <h3 v-if="event.output.properties">Properties</h3>
                    <ul v-if="event.output.properties">
                      <li v-for="(arg, pname) in event.output.properties" :key="'event-' + name + '-property-' + pname">
                        <div class="columns is-mobile">
                          <div class="column is-one-fifth">
                            <code class="arg">{{ pname }}</code>
                          </div>
                          <div class="column is-one-fifth">
                            <i>{{ arg.type }}</i>
                          </div>
                          <div class="column is-three-fifths">
                            <span v-if="arg.help">{{arg.help}}</span>
                          </div>
                        </div>
                      </li>
                    </ul> -->
                  <!-- </a-card> -->
                  <!-- <table class="table is-bordered">
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
                  </table> -->
              </div>
              <div v-if="command.output">
                <h3>Output</h3>
                <p v-if="command.output.help"> {{command.output.help}}</p>
                <p>Returns output of type <code>{{command.output.type}}</code>.</p>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
      <template slot="body-right" v-for="(event, ename) in command.events">
        <div :key="`body-${name}-event-${ename}-right`" v-if="$route.hash === `#${name}-${ename}`">
          <a-tabs>
            <a-card>
              <a-tab-pane title="Example">
                <a-window v-if="event" lang="coffeescript">{{ $parent.serviceName }} {{ name }} as client
    when client {{ ename }} <template v-for="(val, key) in event.arguments">{{key}}:[{{val.type}}] </template>as result
      ...</a-window>
              </a-tab-pane>
              <a-tab-pane title="Use case">
                <p>Coming soon</p>
              </a-tab-pane>
              <a-tab-pane title="Metrics">
                <p>Coming soon</p>
              </a-tab-pane>
            </a-card>
          </a-tabs>
        </div>
        <template v-if="event.output && event.output.commands">
          <div v-if="$route.hash === `#${name}-${ename}-${cname}`" v-for="(command, cname) in event.output.commands" :key="`body-${name}-event-${ename}-command-${cname}-right`">
            <a-tabs>
              <a-card>
                <a-tab-pane title="Example">
                  <a-window lang="coffeescript">{{ $parent.serviceName }} {{ name }} as client
    when client {{ ename }} <template v-for="(val, key) in event.arguments">{{key}}:[{{val.type}}] </template>as result
      result {{ cname }} <template v-for="(val, key) in command.arguments">{{ key }}:[{{val.type}}] </template></a-window>
                </a-tab-pane>
                <a-tab-pane title="Use case">
                  <p>Coming soon</p>
                </a-tab-pane>
                <a-tab-pane title="Metrics">
                  <p>Coming soon</p>
                </a-tab-pane>
              </a-card>
            </a-tabs>
          </div>
        </template>
      </template>
      <div slot="body-right" :key="`body-${name}-right`" v-if="$route.hash === `#${name}`">
        <div>
          <a-tabs>
            <a-card>
              <a-tab-pane title="Example">
                <a-window v-if="!command.events" lang="coffeescript"><template v-if="!command.run">result = </template>{{ $parent.serviceName }} {{ name }}<template v-for="(arg, name) in command.arguments" v-if="arg.required"> {{ name }}:[{{ arg.type }}]</template><template v-if="command.run"> as result
    ...</template></a-window>
                <a-window v-if="command.events" lang="coffeescript">{{ $parent.serviceName }} {{ name }} as client <template v-for="(val, key) in command.events">
    when client {{ key }} <template v-for="(val, key) in val.arguments">{{key}}:[{{val.type}}] </template>as result
      ...</template></a-window>
              </a-tab-pane>
              <a-tab-pane title="Use case">
                <p>Coming soon</p>
              </a-tab-pane>
              <a-tab-pane title="Metrics">
                <p>Coming soon</p>
              </a-tab-pane>
            </a-card>
          </a-tabs>
        </div>
      </div>
    </template>
  </three-column-sidebar>
</template>

<script>
export default {
  name: 'ServiceGuide',
  methods: {
    openRepo: function () {
      window.open(`//github.com/${this.$parent.service.pullUrl}`, '_blank')
    },
    checkHash: function () {
      let hash = this.$route.hash || ''
      if (this.$route.hash.length < 2) {
        hash = `#${Object.keys(this.$parent.commands)[0]}`
        this.$nextTick(() => {
          this.$router.replace({ name: this.$route.name, params: this.$route.params, hash })
        })
      }
      for (let name in this.$parent.commands) {
        if (hash === `#${name}`) return
        if (this.$parent.commands[name].events) {
          for (let event in this.$parent.commands[name].events) {
            if (hash === `#${name}-${event}`) return
            if (this.$parent.commands[name].events[event].output && this.$parent.commands[name].events[event].output.commands) {
              for (let command in this.$parent.commands[name].events[event].output.commands) {
                if (hash === `#${name}-${event}-${command}`) return
              }
            }
          }
        }
        if (Object.keys(this.$parent.commands).indexOf(name) === (Object.keys(this.$parent.commands).length - 1)) {
          hash = `#${Object.keys(this.$parent.commands)[0]}`
          this.$router.replace({ name: this.$route.name, params: this.$route.params, hash })
        }
      }
    }
  },
  watch: {
    '$route': 'checkHash'
  },
  created: function () {
    this.$parent.onReady(this.checkHash)
  }
}
</script>

<style lang="scss">

.card-events {
  padding-bottom: 1.5rem;
}

.argument-card {
  overflow: hidden;
  padding-top: 0 !important;
  border-radius: .5rem;
  .card-header {
    h2 {
      padding: 0 !important;
    }
  }
  & + .argument-card {
    margin-top: 2rem;
  }
}

.sidebar-dark-shadow {
  padding-left: 2rem;
  margin-bottom: 3rem;
}

.right-dark-sidebar {
  .sidebar {
    position: sticky;
    top: 5rem;
  }
  margin-top: -3.75rem;
  padding-top: 4.25rem;
  background-color: lighten(color(dark), 2.5%);
  box-shadow: .25rem 0 .5rem inset rgba(0, 0, 0, .4);
  padding-left: 2rem;
  padding-right: 2rem;
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
}

.relative {
  position: relative;
}

.none-found {
  font-size: 0.9em;
  color: #aaa;
}

.guide-main-content {
  @include breakpoint(max l) {
    padding-left: 3rem !important;
    padding-right: 3rem !important;
  }
}

.list-scroll-spy {
  margin-top: 3rem;
  li {
    padding-left: 1.5rem;
    border-left-width: 2px;
    border-left-style: solid;
    border-left-color: transparent;

    &.sub {
      padding-left: 3rem;
    }

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

.command-header {
  margin-top: 0 !important;
  padding-top: 0 !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .command-name {
    margin: 0;
    cursor: default;
    .command-name-link {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

  .command {
    margin-top: 1.2em;
    margin-bottom: 3em;
    align-items: center;

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

    .command-description {
      font-size: 50%;
      font-weight: 300;
      margin-left: 1rem;
    }

    .command-name {
      // color: #111;
      // margin-top: 0.8em;

      // &::before {
      //   font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica,
      //     Arial, sans-serif;
      //   font-weight: 600;
      //   content: "# ";
      //   margin-left: -22px;
      //   opacity: 0.4;
      //   transition: opacity 0.2s;
      // }

      &:hover {
        &::before {
          opacity: 0.7;
        }
      }
    }

  .toc-commands-container {
    width: calc(100% - 24px);
    overflow: auto;
    margin-bottom: 48px;

    @include breakpoint(max m) {
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

  .arguments-table-container, .card {
    width: 100%;
    overflow: auto;
    padding-top: 0.4em;

    @include breakpoint(max m) {
      width: 100%;
    }

    .required {
      font-weight: 600 !important;
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
