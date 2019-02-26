<template>
  <div>
    <h2 class="command-header">
      <span class="command-name title is-1">
        <template v-if="getEvent"><span
          class="command-name-link"
          @click="$router.replace({ name: $route.name, params: $route.params, hash: `#${getCommand}`})">{{ getCommand }}</span> - </template>
        <span v-else>{{ getCommand }}</span>
        <template v-if="getAction"><span
          class="command-name-link"
          @click="$router.replace({ name: $route.name, params: $route.params, hash: `#${getCommand}-${getEvent}`})">{{ getEvent }}</span> - </template>
        <span v-else>{{ getEvent }}</span>
        <span v-if="getAction">{{ getAction }}</span>
      </span>
      <span
        :class="`is-${getTagColor}`"
        class="has-text-white tag is-large has-text-weight-bold">{{ getTagName }}</span>
    </h2>
    <h3 v-if="action.help">Description</h3>
    <span v-if="action.help">{{ action.help }}</span>
    <h3 v-if="example">Example</h3>
    <a-window
      v-if="example"
      lang="coffeescript">{{ example }}</a-window>
    <h3 v-if="action.arguments">Arguments</h3>
    <div
      v-if="action.arguments"
      class="arguments-table-container">
      <table class="table is-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(arg, name) in action.arguments"
            :key="`${getHash}-arguments-${name}`">
            <td><code class="arg">{{ name }}</code></td>
            <td class="type"><code>{{ arg.type }}</code></td>
            <td class="description">
              <span
                v-if="arg.required"
                class="required">Required. </span>
              <span v-if="arg.default">(Default: <code class="arg">{{ arg.default }}</code>) </span>
              <span v-if="arg.help">{{ arg.help }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template v-if="action.events">
      <h3>Events</h3>
      <ul>
        <li
          v-for="(event, name) in action.events"
          :key="`${getHash}-events-${name}`">
          <a-button
            state="neutral"
            outline
            @click.stop="$router.push({ name: $route.name, params: $route.params, hash: `#${getHash}-${name}`})">{{ name }}</a-button>
        </li>
      </ul>
    </template>
    <template v-if="action.output">
      <h3>Output</h3>
      <p v-if="action.output.help"> {{ action.output.help }}</p>
      <p v-if="action.output.type">Returns output of type <code>{{ action.output.type }}</code>.</p>
      <h3 v-if="action.output.commands">Commands</h3>
      <ul v-if="action.output.commands">
        <li
          v-for="(command, name) in action.output.commands"
          :key="`${getHash}-commands-${name}`">
          <a-button
            state="neutral"
            outline
            @click.stop="$router.push({ name: $route.name, params: $route.params, hash: `#${getHash}-${name}`})">{{ name }}</a-button>
        </li>
      </ul>
      <h3 v-if="action.output.properties">Properties</h3>
      <div
        v-if="action.output.properties"
        class="arguments-table-container">
        <table class="table is-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(property, name) in action.output.properties"
              :key="`${getHash}-properties-${name}`">
              <td><code class="arg">{{ name }}</code></td>
              <td class="type"><code>{{ property.type }}</code></td>
              <td class="description">
                <span
                  v-if="property.required"
                  class="required">Required. </span>
                <span v-if="property.default">(Default: <code class="arg">{{ property.default }}</code>) </span>
                <span v-if="property.help">{{ property.help }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ServiceContent',
  props: {
    action: {
      type: Object,
      default: () => ({}),
      required: true,
      description: 'The action to display as a content'
    },
    example: {
      type: String,
      default: undefined,
      description: 'The action example'
    }
  },
  computed: {
    getHash: function () {
      return this.$route.hash.split('#')[1]
    },
    getHashArray: function () {
      return this.$route.hash.split('#')[1].split('-')
    },
    getCommand: function () {
      return this.getHashArray[0]
    },
    getEvent: function () {
      return this.getHashArray.length > 1 ? this.getHashArray[1] : undefined
    },
    getAction: function () {
      return this.getHashArray.length > 2 ? this.getHashArray[2] : undefined
    },
    getTagColor: function () {
      return this.getAction ? 'dark' : this.getEvent ? 'primary' : this.action.events ? 'info' : 'warning'
    },
    getTagName: function () {
      return this.getAction ? 'action' : this.getEvent ? 'event' : this.action.events ? 'event-based' : 'command'
    }
  }
}
</script>
