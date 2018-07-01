<template>
  <div class="app">
    <app-header class="app-header" link-component="url-link" :show-search="hasSearch" :on-search="onSearch" :links="[
      { text: 'Explore', to: '/' },
      { text: 'Platform', to: 'https://www.asyncy.com/platform' },
      { text: 'Documentation', to: 'https://docs.asyncy.com'},
      { text: 'Submit a service', to: '/', button: true },
    ]"></app-header>
    <router-view></router-view>
    <app-footer/>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    onSearch(value) {
      this.$router.push(`/search?q=${value}`);
    },
  },
  computed: {
    hasSearch() {
      return this.$route.meta.hasSearch;
    },
  },
};
</script>

<style lang="scss">
@import "../../node_modules/bulma/sass/utilities/_all";
@import "../../node_modules/bulma/sass/base/helpers";
@import "../../node_modules/bulma/sass/grid/columns";
@import "../../node_modules/bulma/sass/grid/tiles";
@import "../../node_modules/bulma/sass/components/level";
@import "../../node_modules/bulma/sass/components/media";
@import "../../node_modules/bulma/sass/elements/tag";
@import "../../node_modules/bulma/sass/elements/table";
@import "../assets/fonts/1804-GFNGYO";
</style>

<style lang="styl">
@import "../styles/loading-shimmer"

.table
  border-spacing: 0px;
  border-collapse: collapse;

body
  background: #111;
  margin: 0;

  *, *:before, *:after
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

h1, h2, h3, h4, h5
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 0.5em;

h3, h4, h5
  font-weight: 500;

.app
  background: white;
  font-family: Graphik Web, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  font-size: 1em;
  line-height: 1.6em;

a
  color #7A33D7
  text-decoration none

h1
  font-size: 2.1em;
  margin-bottom: 0.3em;

.fade-enter-active
  transition opacity .3s

.fade-leave-active
  position absolute

.fade-enter, .fade-leave-to
  opacity 0
</style>
