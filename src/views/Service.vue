<template>
  <two-column-sidebar>
    <div slot="sidebar" class="sidebar">
      <div class="sidebar-info">
        <div class="section">
          <h5>Links</h5>
          <transition name="fade">
            <div class="links" v-if="service.repo && service.repo.owner && serviceName"><a :href="`https://www.github.com/${service.repo.owner.username}/${serviceName}`">View on Github</a></div>
            <div v-else-if="!service.repo && !serviceName" class="loading-shimmer tag"></div>
            <p class="links none-found" v-else>No links found.</p>
          </transition>
        </div>

        <div class="section">
          <topics-list v-model="service.topics"/>
        </div>

        <div class="section">
          <h5>Versions</h5>
          <transition-group name="fade" class="versions" tag="ul">
            <li class="version" v-for="tag in tags" :key="tag.tag">{{tag.tag}} - {{tag.state}}</li>
          </transition-group>
          <ul class="versions" v-if="tags.length <= 0 && !serviceName">
            <li class="version"><div class="loading-shimmer tag"></div></li>
          </ul>
          <p class="none-found" v-else-if="tags.length <= 0 && serviceName">No versions found.</p>
        </div>
      </div>
    </div>
    <div slot="body" class="body">
      <div class="name-container level is-mobile">
        <transition name="fade">
          <div class="level-left" v-if="serviceName">
            <div class="level-item">
              <h1>{{serviceName}}</h1>
            </div>
            <div class="level-item">
              <img :src="verifiedIcon"/>
            </div>
          </div>
        </transition>
        <div v-if="!serviceName" class="level-left loading-shimmer alias"></div>
      </div>
      <div class="body-section">
        <h5>Description</h5>
        <transition name="fade">
          <p v-if="service.description">{{service.description | emoji}}</p>
          <p v-else-if="!service.description && serviceName" class="none-found">This service has no description.</p>
          <p v-else class="loading-shimmer description"></p>
        </transition>
      </div>
      <div class="body-section">
        <h5>Commands ({{numCommands}})</h5>

        <div class="command" v-if="numCommands <= 0 && !serviceName">
          <div class="loading-shimmer name"></div>
          <div class="section">
            <div class="subtitle">Description</div>
            <div class="loading-shimmer description"></div>
          </div>
          <div class="section">
            <div class="subtitle">Example</div>
            <div class="loading-shimmer example"></div>
          </div>
          <div class="section">
            <div class="subtitle">Arguments</div>
            <div class="loading-shimmer description"></div>
          </div>
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
                  <td><a :href="`#${name}`">{{name}}</a></td>
                  <td>{{command.help}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </transition>

        <transition-group name="fade" tag="div">
          <div v-for="(command, name) in commands" class="command" :key="name">
            <a :href="`#${name}`" :name="name"><span class="command-name">{{name}}</span></a>

            <div v-if="command.help" class="section">
              <div class="subtitle">Description</div>
              <p>{{command.help}}</p>
            </div>

            <div class="section">
              <div class="subtitle">Example</div>
                <Code v-if="!command.events" lang="coffeescript">
                  <template v-if="!command.run">result = </template>{{ serviceName }} {{ name }}<template v-for="(arg, name) in command.arguments" v-if="arg.required"> {{ name }}:[{{ arg.type }}]</template><template v-if="command.run"> as result
...</template>
                </Code>
                <Code v-if="command.events" lang="coffeescript">
                  {{ serviceName }} {{ name }} as client <template v-for="(val, key) in command.events">
  when client {{ key }} <template v-for="(val, key) in val.arguments">{{key}}:[{{val.type}}] </template>as result
    ...</template>
                </Code>
            </div>

            <div v-if="command.arguments" class="section">
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

            <div v-if="command.output && command.output.type" class="section">
              <div class="subtitle">Output</div>
              <p>Returns output of type <code>{{command.output.type}}</code>.</p>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <!-- <div class="pricing-bar">
      <div class="columns">
        <div class="column is-one-fifth"></div>
        <div class="column is-9">
          <div>
            <h3>Pricing</h3>
          </div>
          <div class="columns">
            <div class="column is-half pricing-bar-left">
              <div class="box">
                <div class="level">
                  <div class="level-left">
                    Free
                  </div>
                  <div class="level-right">
                    $0
                  </div>
                </div>
              </div>
              <div class="box is-disabled">
                <div class="level">
                  <div class="level-left">
                    Small
                  </div>
                  <div class="level-right">
                    $10
                  </div>
                </div>
              </div>
              <div class="box is-disabled">
                <div class="level">
                  <div class="level-left">
                    Medium
                  </div>
                  <div class="level-right">
                    $20
                  </div>
                </div>
              </div>
              <div class="box is-disabled">
                <div class="level">
                  <div class="level-left">
                    Large
                  </div>
                  <div class="level-right">
                    $30
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="box">
                <div class="has-text-weight-bold">List title</div>
                <ul class="pricing-details fa-ul">
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>Phasellus porttitor cursus lectus ac sagittis. Phasellus.</li>
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>Phasellus porttitor cursus lectus ac sagittis. Phasellus.</li>
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>Phasellus porttitor cursus lectus ac sagittis. Phasellus.</li>
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>Phasellus porttitor cursus lectus ac sagittis. Phasellus.</li>
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>Phasellus porttitor cursus lectus ac sagittis. Phasellus.</li>
                </ul>
                <button class="button">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </two-column-sidebar>
</template>

<script>
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

import verifiedIcon from '@/assets/verified.svg'
import { ServiceQuery, ServiceByOwnerAndRepoQuery } from '@/plugins/graphql'
import Code from '@/components/Code'

export default {
  name: 'Service',
  props: ['alias', 'owner', 'repo'],
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
        return data.allOwners.nodes.length > 0 &&
          data.allOwners.nodes[0].repos.nodes.length > 0 &&
          data.allOwners.nodes[0].repos.nodes[0].services.nodes.length > 0 &&
          data.allOwners.nodes[0].repos.nodes[0].services.nodes[0]
      }
    }
  },
  data: () => ({
    serviceByAlias: undefined,
    serviceByOwnerAndRepo: undefined,
    verifiedIcon
  }),
  watch: {
    commands: function () {
      setTimeout(Prism.highlightAll, 0)
    },
    serviceByAlias: function (newValue) {
      if (!newValue) this.$router.push('/404')
    },
    serviceByOwnerAndRepo: function (newValue) {
      if (!newValue) this.$router.push('/404')
    }
  },
  computed: {
    service: function () {
      return this.serviceByAlias || this.serviceByOwnerAndRepo || {}
    },
    serviceName: function () {
      if (!this.service.alias && (!this.service.repo || !this.service.repo.owner)) {
        return ''
      }
      return this.service.alias || `${this.service.repo.owner.username}/${this.service.repo.name}`
    },
    numCommands: function () {
      return Object.keys(this.commands).length
    },
    commands: function () {
      return (this.service &&
        this.service.serviceTags &&
        this.service.serviceTags.nodes &&
        this.service.serviceTags.nodes.length > 0 &&
        this.service.serviceTags.nodes[0].configuration.commands) || {}
    },
    tags: function () {
      return (this.service &&
        this.service.serviceTags &&
        this.service.serviceTags.nodes) || []
    }
  },
  components: {
    Code
  }
}
</script>

<style scoped lang="sass">
.links a:hover, .toc-commands a:hover
  text-decoration: underline
a:focus
  outline: none

.sidebar
  font-size: 0.95em

  .section:not(:first-child)
    margin-top: 1.2em

  .links, .versions
    margin-top: 0
    list-style: none
    padding-left: 0

  .versions
    line-height: 2em

    .version
      font-size: 0.95em
      color: #6E6E6E

  .tag
    font-size: 0.9em
    margin-bottom: 0.4em

.none-found
  font-size: 0.9em
  color: #aaa

.body
  max-width: 800px

  & > .body-section
    margin-top: 1.8em

    p
      margin: 0
      font-size: 0.95em

  .name-container
    margin-bottom: 1.5em
    line-height: 2.8em

    h1
      margin-bottom: 0

    .checkmark
      margin-left: 0.8em
      font-size: 2em
      color: #3E87DA

  /* colors is the array of the secondary brand colors */
  $colors: #001fff #2de5ea #86e028 #ffce00 #ff7900 #f72d2d #ff107d
  /* put color from brands into children (repeat mode) */
  @each $color in $colors
    $i: index($colors, $color)
    .command
      &:nth-of-type(#{ length($colors) }n + #{ $i })
        .command-name
          &::before
            color: nth($colors, $i)

  .command
    margin-top: 1.2em
    margin-bottom: 3em

    .section
      margin-top: 1.5em

    .subtitle
      font-size: 0.9em
      color: #999

    .command-name
      color: #111
      margin-top: 0.8em
      font-size: 26px

      &::before
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif
        font-weight: 600
        content: '# '
        margin-left: -22px
        opacity: 0.4
        transition: opacity .2s

      &:hover
        &::before
          opacity: 0.7

  .toc-commands-container
    width: calc(100% - 24px)
    overflow: auto
    margin-bottom: 48px

    @media (max-width: 769px)
      width: calc(100vw - 24px)

  .toc-commands
    min-width: 380px
    max-width: 510px
    font-size: 0.9em

    tr:not(:last-child)
      border-bottom: 1px solid #979797

    td
      max-width: 450px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis

    & td:first-child
      padding-right: 2em
      padding-left: 0px

  .arg
    border-radius: 3px
    padding: 4px 12px
    border: 1px solid #ccc
    background-color: #f9f9f9

  .arguments-table-container
    width: calc(100% - 24px)
    overflow: auto
    padding-top: 0.4em

    @media (max-width: 769px)
      width: calc(100vw - 24px)

    .required
      font-weight: 500

    table
      width: 100%
      font-size: 0.95em
      th
        font-weight: 500
      .type
        width: 1px
        white-space: nowrap
      .description
        min-width: 320px

.pricing-bar
  background: #F1F1F1
  width: 100vw
  margin-top: 2em

  .pricing-bar-left
    padding-left: 0

  .is-disabled
    border: 1px solid #979797
    opacity: 0.22

  .button
    padding: 0px 56px

  .pricing-details
    margin-left: 0em
    padding-left: 1.3em
    list-style: none

    .fa-check
      color: #2FC050
      font-size: 0.95em

.loading-shimmer
  &.tag
    width: 100px
    height: 1.4em
  &.alias
    height: 2.4em
    width: 150px
  &.description
    height: 1.2em
    max-width: 340px
  &.name
    width: 100px
    height: 1.8em
  &.example
    margin-top: 0.6em
    max-width: 520px
    height: 1.8em
</style>
