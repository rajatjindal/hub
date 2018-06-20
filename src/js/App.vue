<template>
  <div class="app">
    <app-header link-component="url-link" :show-search="hasSearch" :on-search="onSearch" :links="[
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
@import "../../node_modules/bulma/sass/components/card";
@import "../../node_modules/bulma/sass/elements/tag";
@import "../../node_modules/bulma/sass/elements/box";
@import "../../node_modules/bulma/sass/elements/form";
@import "../../node_modules/bulma/sass/elements/table";

@import "../../node_modules/asyncy-ui-components/dist/AppFooter.css";
@import "../../node_modules/asyncy-ui-components/dist/AppHeader.css";
@import "../../node_modules/asyncy-ui-components/dist/HeroBackground.css";

@import "../assets/fonts/1804-GFNGYO";

.table {
  border-spacing: 0px;
  border-collapse: collapse;
}

body {
  background: #111;
  margin: 0;

  *, *:before, *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
}

h1, h2, h3, h4, h5 {
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 0.5em;
}

h3, h4, h5 {
  font-weight: 500;
}

.app {
  background: white;
  font-family: Graphik Web, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  font-size: 1em;
  line-height: 1.6em;
}

.button {
  padding: 12px 32px;
  font-size: 1em;
  border: none;
  color: white;
  background: #16CE72;
  border-radius: 3px;
}

a {
  color: #1376E5;
  text-decoration: none;
}

h1 {
  font-size: 2.8em;
  margin-bottom: 0.3em;
}
</style>
