<template>
  <div class="app">
    <transition name="fade">
      <SubmitAServiceModal v-if="modalOpen" @close="closeSubmitAServiceModal"/>
    </transition>
    <app-header class="app-header" link-component="url-link" :show-search="hasSearch" :on-search="onSearch" :links="[
      { text: 'Explore', to: '/' },
      { text: 'Platform', to: 'https://www.asyncy.com/platform' },
      { text: 'Documentation', to: 'https://docs.asyncy.com'},
    ]">
      <template slot="afterLinks"><a-button @click.native="openSubmitAServiceModal">Submit a Service</a-button></template>
    </app-header>
    <router-view @open-submit-service-modal="openSubmitAServiceModal"></router-view>
    <app-footer/>
  </div>
</template>

<script>
import SubmitAServiceModal from './components/SubmitAServiceModal';

export default {
  name: 'app',
  components: {
    SubmitAServiceModal,
  },
  data() {
    return {
      modalOpen: false,
    };
  },
  methods: {
    onSearch(value) {
      this.$router.push(`/search?q=${value}`);
    },
    openSubmitAServiceModal() {
      this.modalOpen = true;
    },
    closeSubmitAServiceModal() {
      this.modalOpen = false;
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
@import "../../node_modules/asyncy-ui-components/dist/css/global.css";
@import "../../node_modules/bulma/sass/utilities/_all";
@import "../../node_modules/bulma/sass/grid/columns";
@import "../../node_modules/bulma/sass/grid/tiles";
@import "../../node_modules/bulma/sass/components/level";
@import "../../node_modules/bulma/sass/components/media";
@import "../../node_modules/bulma/sass/elements/tag";
@import "../../node_modules/bulma/sass/elements/table";
</style>

<style lang="styl">
@import "../styles/loading-shimmer"

.table
  border-spacing: 0px;
  border-collapse: collapse;

body
  background: #111;
  margin: 0;

h1, h2, h3, h4, h5
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 0.5em;

h3, h4, h5
  font-weight: 500;

.app
  background: white;
  text-align: center;
  color: black;
  font-size: 1em;
  line-height: 1.6em;

a
  color #7A33D7
  text-decoration none

.fade-enter-active
  transition opacity .3s

.fade-leave-active
  position absolute

.fade-enter, .fade-leave-to
  opacity 0
</style>
