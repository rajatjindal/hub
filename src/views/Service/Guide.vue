<template>
  <two-column-sidebar>
    <div
      slot="sidebar"
      class="sidebar sticky-sidebar">
      <div class="sidebar-info">
        <ul class="section sidebar-stick list-scroll-spy">
          <template v-for="(command, name) in $parent.commands">
            <li
              :key="`list-command-${name}`"
              :class="{ active: $route.hash === `#${name}`}">
              <a
                :href="`#${name}`"
                :title="name">{{ name }}</a>
            </li>
            <template v-if="command.events">
              <li
                v-for="(event, ename) in command.events"
                :key="`list-subcommand-${ename}`"
                :class="{ 'sub': true, active: $route.hash.includes(`#${name}-${ename}`) }">
                <a
                  :href="`#${name}-${ename}`"
                  :title="ename">{{ ename }}</a>
              </li>
            </template>
          </template>
        </ul>
      </div>
    </div>
    <div
      slot="body"
      class="body">
      <transition-group
        name="fade"
        tag="div"
        class="command body-section">
        <service-content
          v-if="loaded"
          :key="`container-${getHash}`"
          :action="getActionFromHash"
          :example="getExampleFromAction" />
      </transition-group>
    </div>
  </two-column-sidebar>
</template>

<script>
import ServiceContent from '@/components/ServiceContent'

export default {
  name: 'ServiceGuide',
  components: { ServiceContent },
  data: () => ({ loaded: false }),
  computed: {
    getHash: function () {
      return this.$route.hash.split('#')[1]
    },
    getHashArray: function () {
      return this.$route.hash.split('#')[1].split('-')
    },
    getActionFromHash: function () {
      let action = this.$parent.commands[this.getHashArray[0]]
      if (this.getHashArray.length > 1 && action.events) {
        action = action.events[this.getHashArray[1]]
      }
      if (this.getHashArray.length > 2 && action.output && action.output.commands) {
        action = action.output.commands[this.getHashArray[2]]
      }
      return action
    },
    getEventFromHash: function () {
      return this.getHashArray.length > 1 ? this.$parent.commands[this.getHashArray[0]].events[this.getHashArray[1]] : undefined
    },
    getActionName: function () {
      return this.getHashArray[this.getHashArray.length - 1]
    },
    getExampleFromAction: function () { // generating example content
      let action = this.getActionFromHash
      let ret = ''
      if (this.getHashArray.length === 2) { // it's an event
        ret += `${this.$parent.serviceName} ${this.getHashArray[0]} as client\n  when client ${this.getActionName} `
        for (let arg in action.arguments) {
          ret += `${arg}:[${action.arguments[arg].type}] `
        }
        ret += 'as result\n    ...'
      } else if (this.getHashArray.length === 3) { // it's an action
        ret += `${this.$parent.serviceName} ${this.getHashArray[0]} as client\n  when client ${this.getHashArray[1]} `
        for (let arg in this.getEventFromHash.arguments) {
          ret += `${arg}:[${this.getEventFromHash.arguments[arg].type}] `
        }
        ret += `as result\n    result ${this.getActionName} `
        for (let arg in action.arguments) {
          ret += `${arg}:[${action.arguments[arg].type}] `
        }
      } else if (!action.events) { // it's a command
        if (!action.run) {
          ret += 'result = '
        }
        ret += `${this.$parent.serviceName} ${this.getActionName}`
        for (let arg in action.arguments) {
          if (action.arguments[arg].required) {
            ret += ` ${arg}:[${action.arguments[arg].type}]`
          }
        }
        if (action.run) {
          ret += ' as result\n  ...'
        }
      } else { // it's an event-based
        ret += `${this.$parent.serviceName} ${this.getActionName} as client `
        for (let event in action.events) {
          ret += `\n  when client ${event} `
          for (let arg in action.events[event].arguments) {
            ret += `${arg}:[${action.events[event].arguments[arg].type}] `
          }
          ret += `as result\n    ...`
        }
      }
      return ret
    }
  },
  watch: {
    '$route': 'checkHash'
  },
  created: function () {
    this.$parent.onReady(this.checkHash)
  },
  methods: {
    openRepo: function () {
      window.open(`//github.com/${this.$parent.service.pullUrl}`, '_blank')
    },
    checkHash: function () {
      this.loaded = true
      if (!this.$route.name.includes('guide')) return
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
  background-color: lighten($dark, 2.5%);
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
  @include fullhd {
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
    margin: 0 !important;
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

    @include touch {
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

    @include touch {
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
