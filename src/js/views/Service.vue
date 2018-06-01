<template>
  <div class="index">
    <app-header hasSearchBar="true"></app-header>
    <div class="columns">
      <div class="column is-one-fifth sidebar">
        <div>
          <button class="button is-primary">+ Add to story</button>

          <ul>
            <li><a href="/">Try a demo →</a></li>
            <li><a href="/">View on Github →</a></li>
          </ul>

          <div class="sidebar-info">
            <p class="sidebar-header has-text-weight-bold">Topics</p>
            <div class="no-topics" v-if="!service.topics">No topics</div>
            <div v-for="t in service.topics"><span class="tag">{{t}}</span></div>

            <p class="sidebar-header has-text-weight-bold">Versions</p>
            <ul>
              <li v-for="tag in tags">{{tag.tag}} - {{tag.state}}</li>
            </ul>

            <p class="sidebar-header has-text-weight-bold">Quick Links</p>
            <ul>
              <li><a href="/">Github</a></li>
              <li><a href="/">Support</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="column is-7 body">
        <div class="level name-container is-mobile">
          <div class="level-left">
            <h1>{{service.alias}}</h1><i class="fas fa-check-circle checkmark" aria-hidden="true"></i>
          </div>
        </div>
        <div class="body-section" v-if="service.description">
          <h4>Description</h4>
          <p>{{service.description | emoji}}</p>
        </div>
        <div class="body-section">
          <h4>Commands</h4>

          <div v-for="(command, name, index) in commands" class="command" :key="index">
            <code class="code">{{service.alias}} {{name}}</code>
            <p>{{command.help}}</p>

            <h5>Arguments</h5>
            <table class="table is-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(arg, name, index) in command.arguments">
                  <td>{{name}}</td>
                  <td>{{arg.type}}</td>
                  <td>{{arg.required || 'false'}} <span v-if="arg.default">(default: {{arg.default}})</span></td>
                  <td>{{arg.help}}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="view-all-commands">
            View all commands
          </p>

          <div class="card">
            <div class="card-content">
              <span v-html="readme"/>
            </div>
          </div>

          <div class="documentation-link">
            <a href="/">View all documentation here →</a>
          </div>
        </div>
      </div>
    </div>
    <div class="pricing-bar">
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
    </div>
    <app-footer/>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';

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
      service: {},
    };
  },
  computed: {
    commands() {
      return this.service &&
        this.service.serviceTagsByServiceUuid &&
        this.service.serviceTagsByServiceUuid.nodes &&
        this.service.serviceTagsByServiceUuid.nodes[0].configuration.commands;
    },
    readme() {
      const markdown = new MarkdownIt();
      return this.service &&
        this.service.serviceTagsByServiceUuid &&
        this.service.serviceTagsByServiceUuid.nodes &&
        markdown.render(this.service.serviceTagsByServiceUuid.nodes[0].readme);
    },
    tags() {
      return this.service &&
        this.service.serviceTagsByServiceUuid &&
        this.service.serviceTagsByServiceUuid.nodes;
    },
  },
  components: {
    ServiceSummary,
  },
};
</script>

<style scoped lang="styl">
h1, h2
  font-weight normal
  margin 0

.sidebar
  margin-top 1em

  .sidebar-info
    margin-top 3.7em

    .sidebar-header
      margin-top 2em

  ul
    list-style none
    padding-left 0
    line-height 2em

  .tag
    font-size 0.9em
    margin-bottom 0.4em


  .no-topics
    font-size 0.9em
    color #ccc


.body
  margin-top 1em

  & > .body-section
    margin-top 3em

  & > .body-section ~ .body-section
    margin-top 4.5em

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
    margin-bottom 3em

  .code
    border-radius 4px
    font-size 1.3em
    background-color #F5F8FA
    padding 14px

    .tag
      font-size 1em
      background #E181E5


.view-all-commands
  color #C0C0C0
  font-size 0.8em

.columns
  max-width 1100px
  margin 0 auto
  text-align left

.search-result
  padding-top 1.5em
  border-top 1px solid #C7C7C7

.documentation-link
  margin-top 3em

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
