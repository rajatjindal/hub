<template>
  <two-column-sidebar>
    <div slot="sidebar" class="sidebar sticky-sidebar">
      <div class="sidebar-info">
        <div class="section">
          <transition name="fade">
            <div class="links">
              <a-button state="primary" outline @click="openRepo"><font-awesome-icon :icon="['fab', 'github']" brand /> Github repo</a-button>
              <!-- <a-button type="link"><font-awesome-icon :icon="['fab', 'docker']" brand /> Docker hub</a-button> -->
            </div>
          </transition>
        </div>

        <ul class="section sidebar-stick list-scroll-spy" v-scroll-spy-active v-scroll-spy-link>
          <li v-for="(command, name) in $parent.commands" :key="`list-command-${name}`">
            <a :href="`#${name}`" :title="name">{{ name }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div slot="body" class="body" v-scroll-spy>
      <transition-group name="fade" tag="div" class="command body-section" v-for="(command, name) in $parent.commands" :key="name">
        <div :key="`container-${name}`">
          <h3 :id="name" @click="$router.replace({ name: 'guide', params: { repo: $parent.repo }, hash: `#${name}`})" :href="`#${name}`" :name="name" class="command-header"><span class="command-name">{{ name | capitalize }}</span></h3>

          <div class="section">
            <div>
              <h3>Description</h3>
              <p v-if="command.help">{{command.help}}</p>
            </div>
            <div>
              <h3>Example</h3>
                <a-window v-if="!command.events" lang="coffeescript"><template v-if="!command.run">result = </template>{{ $parent.serviceName }} {{ name }}<template v-for="(arg, name) in command.arguments" v-if="arg.required"> {{ name }}:[{{ arg.type }}]</template><template v-if="command.run"> as result
  ...</template></a-window>
                <a-window v-if="command.events" lang="coffeescript">{{ $parent.serviceName }} {{ name }} as client <template v-for="(val, key) in command.events">
  when client {{ key }} <template v-for="(val, key) in val.arguments">{{key}}:[{{val.type}}] </template>as result
    ...</template></a-window>
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
            </div>
            <div>
              <h3>Output</h3>
              <p v-if="command.output">Returns output of type <code>{{command.output.type}}</code>.</p>
              <p v-else>Returns nothing.</p>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </two-column-sidebar>
</template>

<script>
export default {
  name: 'ServiceGuide',
  methods: {
    openRepo: function () {
      window.open(`//github.com/${this.$parent.service.pullUrl}`, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">

.hero {
  position: relative;
  overflow: hidden;
  padding: 4em 5em;
  background: #635151;
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

.command-header {
  margin-top: 0 !important;
  padding-top: 5rem !important;
  cursor: pointer;
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
        cursor:pointer;
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

  .arguments-table-container {
    width: calc(100% - 24px);
    overflow: auto;
    padding-top: 0.4em;

    @include breakpoint(max m) {
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
