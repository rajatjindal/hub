<template>
  <two-column-sidebar>
    <div slot="sidebar" class="sidebar">
      <div class="sidebar-info">
        <div class="section">
          <h5>Links</h5>
          <transition name="fade">
            <div class="links" v-if="service.repo && service.alias"><a :href="`https://www.github.com/${service.repo.owner.username}/${service.alias}`">View on Github</a></div>
            <div v-else-if="!service.repo && !service.alias" class="loading-shimmer tag"></div>
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
          <ul class="versions" v-if="tags.length <= 0 && !service.alias">
            <li class="version"><div class="loading-shimmer tag"></div></li>
          </ul>
          <p class="none-found" v-else-if="tags.length <= 0 && service.alias">No versions found.</p>
        </div>
      </div>
    </div>
    <div slot="body" class="body">
      <div class="name-container level is-mobile">
        <transition name="fade">
          <div class="level-left" v-if="service.alias">
            <div class="level-item">
              <h1>{{service.alias}}</h1>
            </div>
            <div class="level-item">
              <img :src="verifiedIcon"/>
            </div>
          </div>
        </transition>
        <div v-if="!service.alias" class="level-left loading-shimmer alias"></div>
      </div>
      <div class="body-section">
        <h5>Description</h5>
        <transition name="fade">
          <p v-if="service.description">{{service.description | emoji}}</p>
          <p v-else-if="!service.description && service.alias" class="none-found">This service has no description.</p>
          <p v-else class="loading-shimmer description"></p>
        </transition>
      </div>
      <div class="body-section">
        <h5>Commands</h5>

        <div class="command" v-if="commands.length <= 0 && !service.alias">
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
          <div v-if="commands.length <= 0 && service.alias" class="none-found">
            This service has no commands.
          </div>
        </transition>

        <transition-group name="fade" tag="div">
          <div v-for="(command, name, index) in commands" class="command" :key="name">
            <a :href="`#${name}`" :name="name"><div class="command-name">{{name}}</div></a>

            <div v-if="command.help" class="section">
              <div class="subtitle">Description</div>
              <p>{{command.help}}</p>
            </div>

            <div class="section">
              <div class="subtitle">Example</div>
              <div class="code-container">
                <pre class="snippet"><code class="code language-coffeescript">result = {{service.alias}} {{name}}<template v-for="(arg, name, index) in command.arguments" v-if="arg.required"> {{ name }}:[{{ arg.type }}]</template></code></pre>
                <button class="clippy-btn" @click="copyText"><img class="clippy" width="13" :src="clippy" alt="Copy to clipboard"></button>
                <div class="copied"></div>
              </div>
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
                    <tr v-for="(arg, name, index) in command.arguments">
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
import Prism from 'prismjs';

import clippy from '../../assets/clippy.svg';
import verifiedIcon from '../../assets/verified.svg';
import queries from '../utils/graphql';
import ServiceSummary from '../components/ServiceSummary';

export default {
  name: 'SearchResults',
  props: ['alias'],
  apollo: {
    service: {
      query: queries.SERVICE_QUERY,
      variables() {
        return {
          where: this.alias,
        };
      },
      update(data) {
        return data.serviceByAlias;
      },
    },
  },
  data() {
    return {
      clippy,
      service: {},
      verifiedIcon,
    };
  },
  watch: {
    commands() {
      setTimeout(Prism.highlightAll, 0);
    },
  },
  methods: {
    copyText(e) {
      this.$copyText(e.srcElement.parentElement && e.srcElement.parentElement.textContent);
    },
  },
  computed: {
    commands() {
      return (this.service &&
        this.service.serviceTags &&
        this.service.serviceTags.nodes &&
        this.service.serviceTags.nodes.length > 0 &&
        this.service.serviceTags.nodes[0].configuration.commands) || [];
    },
    tags() {
      return (this.service &&
        this.service.serviceTags &&
        this.service.serviceTags.nodes) || [];
    },
  },
  components: {
    ServiceSummary,
  },
};
</script>

<style scoped lang="styl">
.button
  cursor pointer
  padding 12px 32px
  font-size 1em
  border none
  color white
  background #4C5CE8
  border-radius 3px
  transition all 0.1s

  &:hover
    filter brightness(1.2)

.sidebar
  font-size 0.95em

  .section:not(:first-child)
    margin-top 1.2em

  .links, .versions
    margin-top 0
    list-style none
    padding-left 0

  .links a
    color #4C5CE8
    &:hover
      text-decoration underline

  .versions
    line-height 2em

    .version
      font-size 0.95em
      color #6E6E6E

  .tag
    font-size 0.9em
    margin-bottom 0.4em

.none-found
  font-size 0.9em
  color #aaa

.body
  max-width 800px

  & > .body-section
    margin-top 1.8em

    p
      margin 0
      font-size 0.95em

  .name-container
    margin-bottom 1.5em
    line-height 2.8em

    .checkmark
      margin-left 0.8em
      font-size 2em
      color #3E87DA

  .command
    margin-top 1.2em
    margin-bottom 3em

    .section
      margin-top 1.5em

    .subtitle
      font-size 0.9em
      color #999

    .command-name
      color #111
      margin-top 0.8em
      font-size 26px

      &::before
        font-family -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif
        font-weight 600
        content '# '
        color #c9c9c9
        margin-left -22px
        opacity 0
        transition opacity 0.2s

      &:hover::before
        opacity 1


  .arg
    border-radius 3px
    padding 4px 12px
    border 1px solid #ccc
    background-color #f9f9f9

  .code-container
    width calc(100% - 24px)
    overflow scroll
    position relative

    &:hover .clippy-btn
      opacity 1

    @media (max-width 768px)
      width calc(100vw - 24px)

  .snippet
    position relative
    margin 10px 0px
    font-size 0.9em
    padding 10px 22px
    border-radius 3px

  .copied
    &::before
      content 'Copied'
    pointer-events none
    opacity 0
    font-size 0.8em
    padding 1px 5px
    border-radius 3px
    background-color white
    position absolute
    right 8px
    top 17px
    transition opacity 1s ease 0.5s

  .clippy-btn
    transition opacity .3s ease-in-out
    opacity 0
    padding 3px 6px
    position absolute
    right 8px
    top 18px
    cursor: pointer;
    background-color #eee
    border-radius 3px
    outline none

    &:active
      background-color #dcdcdc
      background-image none
      border-color #b5b5b5
      box-shadow inset 0 2px 4px rgba(0,0,0,.15)

      & ~ .copied
        transition opacity 0s step-start 0s
        opacity 1

    &:hover
      text-decoration none
      background-color #ddd
      border-color #ccc

    .clippy
      pointer-events none
      position relative
      top 1px

  .arguments-table-container
    width calc(100% - 24px)
    overflow scroll
    padding-top 0.4em

    @media (max-width: 769px)
      width calc(100vw - 24px)

    .required
      font-weight 500

    table
      width 100%
      font-size 0.95em
      th
        font-weight 500
      .type
        width 1px
        white-space nowrap
      .description
        min-width 320px

.pricing-bar
  background #F1F1F1
  width 100vw
  margin-top 2em

  .pricing-bar-left
    padding-left 0

  .is-disabled
    border 1px solid #979797
    opacity 0.22

  .button
    padding 0px 56px

  .pricing-details
    margin-left 0em
    padding-left 1.3em
    list-style none

    .fa-check
      color #2FC050
      font-size 0.95em

.loading-shimmer
  &.tag
    width 100px
    height 1.4em
  &.alias
    height 2.4em
    width 150px
  &.description
    height 1.2em
    max-width 340px
  &.name
    width 100px
    height 1.8em
  &.example
    margin-top 0.6em
    max-width 520px
    height 1.8em

</style>
