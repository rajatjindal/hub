<template>
  <div id="hub">
    <a-cookie />
    <a-header @open-service-modal="openSubmitAServiceModal" />
    <transition name="view-fade" mode="out-in">
      <router-view @open-submit-service-modal="openSubmitAServiceModal"></router-view>
    </transition>
    <app-footer/>
    <submit-service-modal id="submit-service-modal" ref="submitAServiceModal" />
  </div>
</template>

<script>
import SubmitServiceModal from '@/components/SubmitAServiceModal'
import AHeader from '@/components/Header'

export default {
  name: 'app',
  components: {
    SubmitServiceModal,
    AHeader
  },
  methods: {
    openSubmitAServiceModal: function() {
      this.$refs.submitAServiceModal.show = true
    },
    closeSubmitAServiceModal: function() {
      this.$refs.submitAServiceModal.show = false
    }
  }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
@import "~bulma/sass/grid/columns";
@import "~bulma/sass/grid/tiles";
@import "~bulma/sass/components/level";
@import "~bulma/sass/components/media";
@import "~bulma/sass/elements/tag";
@import "~bulma/sass/elements/table";
@import "~@/assets/loading-shimmer";

.table {
  border-spacing: 0px;
  border-collapse: collapse;
}

body {
  background: #111;
  margin: 0;
}

h1,
h2,
h3,
h4,
h5 {
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 0.5em;
}

h3,
h4,
h5 {
  font-weight: 500;
}

#hub {
  background: white;
  text-align: center;
  color: black;
  font-size: 1em;
  line-height: 1.6em;
}

a {
  color: #7a33d7;
  text-decoration: none;
}

.fade-enter-active {
  transition: opacity 0.3s;
}

.fade-leave-active {
  position: absolute;
}

.align-items-center {
  align-items: center;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.header-search-bar {
  margin-bottom: 0 !important;
}

#hub {
  .section {
    padding-top: 0;
    padding-bottom: 2em;
  }
}

.view-fade-enter-active,
.view-fade-leave-active {
  transition-duration: 0.1s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.view-fade-enter,
.view-fade-leave-active {
  opacity: 0
}

.left-image,
.right-image {
  z-index: -1 !important;
}

@import "~asyncy-ui-components/dist/css/global.css";
@import "~asyncy-ui-components/dist/AButton.css";
@import "~asyncy-ui-components/dist/AInput.css";
@import "~asyncy-ui-components/dist/AppFooter.css";
@import "~asyncy-ui-components/dist/AppHeader.css";
</style>
