<template>
  <two-column-sidebar>
    <div slot="sidebar" class="sidebar sticky-sidebar">
      <div class="sidebar-info">
        <ul class="section sidebar-stick list-scroll-spy" v-scroll-spy-active v-scroll-spy-link>
          <li><a href="#readme">Description</a></li>
          <li><a href="#commands">Commands</a></li>
          <!-- <li><a href="#similars">Similar apps</a></li> -->
          <li><a href="#versions">Versions</a></li>
        </ul>
      </div>
    </div>
    <div slot="body" class="body" v-scroll-spy="{ offset: 100 }">
      <div class="body-section">
        <h3 class="heading-title title is-3 text-dark" id="readme">Description</h3>
        <div class="readme-md info" v-if="$parent.tags && $parent.tags.length > 0 && $parent.tags[0].readme === false">
          <h3>No Readme file found for this microservice</h3>
        </div>
        <vue-markdown v-else-if="$parent.tags && $parent.tags.length > 0 && $parent.tags[0].readme" class="readme-md">{{ $parent.tags[0].readme }}</vue-markdown>
      </div>
      <div class="body-section">
        <h3 class="heading-title title is-3 text-dark" id="commands">Commands ({{ $parent.numCommands }})</h3>
        <div class="command" v-if="$parent.numCommands <= 0 && !$parent.serviceName">
          <div class="loading-shimmer name"></div>
        </div>

        <transition name="fade">
          <div v-if="$parent.numCommands <= 0 && $parent.serviceName" class="none-found">
            This service has no commands.
          </div>
        </transition>

        <transition name="fade">
          <div class="toc-commands-container" v-if="$parent.numCommands > 1">
            <table class="table toc-commands">
              <tbody>
                <tr v-for="(command, name) in $parent.commands" :key="name">
                  <td><router-link :to="{ name: 'guide', params: { repo: $parent.repo }, hash: `#${name}` }" :href="`#${name}`">{{name}}</router-link></td>
                  <td>{{command.help}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </transition>
      </div>
      <!-- <div class="body-section">
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
      </div> -->
      <div class="body-section">
        <h3 class="heading-title title is-3 text-dark" id="versions">Versions</h3>
        <template v-for="tag of $parent.tags" v-if="tag.configuration && tag.configuration.info && tag.configuration.info.version">
          <h3 :key="`version-${tag.state}`" class="version-head">{{ tag.configuration.info.version }} <a-badge state="warning" outline lower>{{ tag.tag }}</a-badge></h3>
          <p v-if="tag.changelog" :key="`version-${tag.state}-content`">{{ tag.changelog }}</p>
          <p :key="`version-${tag.state}-content` " v-else>No logs provided</p>
        </template>
        <h3 v-else class="version-head">UNKNOWN <a-badge state="warning" outline lower>{{ $parent.tags[0].tag }}</a-badge></h3>
      </div>
    </div>
  </two-column-sidebar>
</template>

<script>
export default {
  name: 'ServiceHome',
  watch: {
    '$parent.tags': {
      deep: true,
      handler: function (value) {
        if (value.length > 0 && value[0].readme) {
          /* global Prism */
          this.$nextTick(Prism.highlightAll)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.readme-md {
  border-left: .5rem solid gray(200);
  padding-left: 3rem;
  &:not(.info) {
    padding-bottom: 2rem;
  }
}

.body-section {
  &:not(:first-child) {
    margin: 5rem 0 !important;
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

</style>
