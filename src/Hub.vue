<template>
  <div id="hub">
    <!-- <a-cookie /> -->
    <a-header @open-service-modal="openSubmitAServiceModal" />
    <div class="main-container">
      <transition name="view-fade" mode="out-in">
        <router-view @open-submit-service-modal="openSubmitAServiceModal"></router-view>
      </transition>
    </div>
    <div class="section bg--dark">
      <div class="container">
        <a-footer dark />
      </div>
    </div>
    <!-- <submit-service-modal id="submit-service-modal" ref="submitAServiceModal" /> -->
  </div>
</template>

<script>
import SubmitServiceModal from '@/components/SubmitAServiceModal'
import AHeader from '@/components/Header'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    SubmitServiceModal,
    AHeader
  },
  computed: mapGetters(['getUser', 'isUserLoggedIn']),
  watch: {
    'isUserLoggedIn': function (value) {
      // console.log('is logged in:', value)
    }
  },
  mounted: function () {
    // this.$api.dummyUser()
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

.table {
  border-spacing: 0px;
  border-collapse: collapse;
}

.main-container {
  @include breakpoint(max m) { margin-top: 54px }
  margin-top: 72px;
  min-height: calc(100% - 72px - 406px);
}

.section {
  color: color(dark);
  z-index: 2;
  display: block;
  height: auto;
  position: relative;
  padding: 0;
  margin: 0;

  .container {
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    flex: 1;
    padding: 3rem 2rem;
    z-index: 10;
    position: relative;

    &.full-width {
      width: 100%;
      max-width: 100%;
    }
  }
}

.footer-container {
  background: color(dark);
}

#hub {
  background-color: color(dark);
  position: relative;
  // color: black;
}

.hero {
  position: relative;

  .hero-body {
    z-index: 0;
  }
}

section, .section {
  background-color: $white;
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

.router-link-exact-active {
  &:before {
    left: 0 !important;
    right: 0 !important;
    opacity: 1 !important;
    background-color: color(light) !important;
  }
}

.left-image,
.right-image {
  z-index: -1 !important;
}
</style>
