<template>
  <two-column-sidebar>
    <div slot="sidebar" class="sidebar">
      <button class="button is-primary">+ Add to story</button>

      <ul class="links">
        <!-- <li><a href="/">Try a demo →</a></li> -->
        <li><a :href="`https://www.github.com/${service.pullUrl}`">View on Github →</a></li>
      </ul>

      <div class="sidebar-info">
        <topics-list v-model="service.topics"/>

        <h4 class="sidebar-header">Versions</h4>
        <ul class="versions">
          <li class="version" v-for="tag in tags">{{tag.tag}} - {{tag.state}}</li>
        </ul>
      </div>
    </div>
    <div slot="body" class="body">
      <div class="name-container">
        <h1>{{service.alias}}</h1>
      </div>
      <div class="body-section" v-if="service.description">
        <h4>Description</h4>
        <p>{{service.description | emoji}}</p>
      </div>
      <div class="body-section">
        <h4>Commands</h4>

        <div v-for="(command, name, index) in commands" class="command" :key="index">
          <div class="command-name">{{name}}</div>

          <div v-if="command.help" class="section">
            <div class="subtitle">Description</div>
            <p>{{command.help}}</p>
          </div>

          <div class="section">
            <div class="subtitle">Example</div>
            <div class="code-container">
              <pre class="snippet"><code class="code language-coffeescript">result = {{service.alias}} {{name}}<template v-for="(arg, name, index) in command.arguments" v-if="arg.required"> {{ name }}:[{{ arg.type }}]</template></code></pre>
              <button class="clippy-btn" @click="copyText"><img class="clippy" width="13" :src="clippy" alt="Copy to clipboard"></button>
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
                    <td><code class="arg">{{arg.type}}</code></td>
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

          <div v-if="command.output && command.output.type">
            <h5>Output</h5>
            <div>{{command.output}}</div>
          </div>
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
      return this.service &&
        this.service.serviceTags &&
        this.service.serviceTags.nodes &&
        this.service.serviceTags.nodes.length > 0 &&
        this.service.serviceTags.nodes[0].configuration.commands;
    },
    tags() {
      return this.service &&
        this.service.serviceTags &&
        this.service.serviceTags.nodes;
    },
  },
  components: {
    ServiceSummary,
  },
};
</script>

<style scoped lang="styl">
.sidebar
  .button
    margin-bottom 0.8em

  .sidebar-info
    margin-top 3.7em

    .sidebar-header
      margin-top 2em

  .links, .versions
    margin-top 0
    list-style none
    padding-left 0

  .links a
    font-size 0.9em

  .versions
    line-height 2em

    .version
      font-size 0.95em
      color #6E6E6E

  .tag
    font-size 0.9em
    margin-bottom 0.4em

.body
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
      margin-top 0.8em
      font-size 26px

  .arg
    border-radius 3px
    padding 4px 12px
    border 1px solid #ccc
    background-color #f9f9f9

  .code-container
    width fit-content
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

    &:hover
      text-decoration none
      background-color #ddd
      border-color #ccc

    .clippy
      pointer-events none
      position relative
      top 1px

  .arguments-table-container
    max-width calc(100vw - 24px)
    overflow scroll
    padding-top 0.4em

    .required
      font-weight 500

    table
      font-size 0.95em
      th
        font-weight 500
      .description
        min-width 280px

        @media (min-width: 1024px)
          min-width 400px

        @media (max-width: 769px)
          min-width auto
          width 100%

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

</style>
