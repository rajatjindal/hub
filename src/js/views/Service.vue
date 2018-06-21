<template>
  <div class="index">
    <div class="columns">
      <div class="column is-one-fifth sidebar">
        <div>
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
      </div>
      <div class="column is-7 body">
        <div class="name-container">
          <h1 class="h1">{{service.alias}}</h1>
        </div>
        <div class="body-section" v-if="service.description">
          <h4>Description</h4>
          <p>{{service.description | emoji}}</p>
        </div>
        <div class="body-section">
          <h4>Commands</h4>

          <div v-for="(command, name, index) in commands" class="command" :key="index">
            <h3>{{name}}</h3>
            <p>{{command.help}}</p>
            <h5>Example</h5>
            <pre class="snippet"><code class="code">result = {{service.alias}} {{name}}<template v-for="(arg, name, index) in command.arguments" v-if="arg.required"> {{ name }}:[{{ arg.type }}]</template><button class="clippy-btn" @click="copyText"><img class="clippy" width="13" :src="clippy" alt="Copy to clipboard"></button></code>
            </pre>

            <div v-if="command.arguments">
              <h5>Arguments</h5>
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
                    <td>
                      <span v-if="arg.required" class="has-text-weight-bold">Required. </span>
                      <span v-if="arg.default">(Default: <code class="arg">{{arg.default}}</code>) </span>
                      <span v-if="arg.help">{{arg.help}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="command.output && command.output.type">
              <h5>Output</h5>
              <div>{{command.output}}</div>
            </div>
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
  </div>
</template>

<script>
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
  margin-top 1em

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
  margin-top 1em

  & > .body-section
    margin-top 2.5em

  & > .body-section ~ .body-section
    margin-top 3.2em

  .name-container
    margin-bottom 1.5em
    line-height 2.8em

    .checkmark
      margin-left 0.8em
      font-size 2em
      color #3E87DA

  .margin-left-3
    margin-left 0.8em

  .command
    margin-bottom 2em
    padding-bottom 1.5em

  .arg
    border-radius 3px
    padding 2px 6px
    border 1px solid #ccc
    background-color #f9f9f9

  .snippet
    .code
      position relative
      border-radius 4px
      font-size 1.3em
      background-color #f9f9f9
      border 1px solid #ccc
      padding 12px 16px

      .tag
        font-size 1em
        background #E181E5

      .clippy-btn
        transition opacity .3s ease-in-out
        opacity 0
        padding 3px 6px
        position absolute
        right 10px
        top 10px
        cursor: pointer;
        background-color #eee
        background-image linear-gradient(#fcfcfc,#eee)
        border 1px solid #d5d5d5
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
          background-image linear-gradient(#eee,#ddd)
          border-color #ccc

        .clippy
          pointer-events none
          position relative
          top 1px

      &:hover .clippy-btn
        opacity 1

.columns
  max-width 1100px
  margin 0 auto
  text-align left

.search-result
  padding-top 1.5em
  border-top 1px solid #C7C7C7

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
