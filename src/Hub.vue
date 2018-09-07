<template>
  <div id="hub">
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
import SubmitAServiceModal from '@/components/SubmitAServiceModal'

export default {
  name: 'app',
  components: {
    SubmitAServiceModal
  },
  computed: {
    hasSearch: function () {
      return this.$route.meta.hasSearch
    }
  },
  data: () => ({
    modalOpen: false
  }),
  methods: {
    onSearch: function (value) {
      this.$router.push(`/search?q=${value}`)
    },
    openSubmitAServiceModal: function () {
      this.modalOpen = true
    },
    closeSubmitAServiceModal: function () {
      this.modalOpen = false
    }
  }
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/_all"
@import "~bulma/sass/grid/columns"
@import "~bulma/sass/grid/tiles"
@import "~bulma/sass/components/level"
@import "~bulma/sass/components/media"
@import "~bulma/sass/elements/tag"
@import "~bulma/sass/elements/table"
@import "~@/assets/loading-shimmer"

.table
  border-spacing: 0px
  border-collapse: collapse

body
  background: #111
  margin: 0

h1, h2, h3, h4, h5
  font-weight: normal
  margin-top: 0
  margin-bottom: 0.5em

h3, h4, h5
  font-weight: 500

#hub
  background: white
  text-align: center
  color: black
  font-size: 1em
  line-height: 1.6em

a
  color: #7A33D7
  text-decoration: none

.fade-enter-active
  transition: opacity .3s

.fade-leave-active
  position: absolute

.fade-enter, .fade-leave-to
  opacity: 0

@import "~asyncy-ui-components/dist/css/global.css"
@import "~asyncy-ui-components/dist/AButton.css"
@import "~asyncy-ui-components/dist/AInput.css"
@import "~asyncy-ui-components/dist/AppFooter.css"
@import "~asyncy-ui-components/dist/AppHeader.css"
</style>
