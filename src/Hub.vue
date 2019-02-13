<template>
  <div id="hub">
    <!-- <a-cookie /> -->
    <a-header />
    <div class="main-container">
      <transition
        name="view-fade"
        mode="out-in">
        <router-view @open-submit-service-modal="openSubmitAServiceModal" />
      </transition>
    </div>
    <a-footer dark />
    <!-- <submit-service-modal id="submit-service-modal" ref="submitAServiceModal" /> -->
  </div>
</template>

<script>
// import SubmitServiceModal from '@/components/SubmitAServiceModal'
import AHeader from '@/components/Header'
import { mapGetters } from 'vuex'

export default {
  name: 'Hub',
  components: {
    // SubmitServiceModal,
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
    openSubmitAServiceModal: function () {
      this.$refs.submitAServiceModal.show = true
    },
    closeSubmitAServiceModal: function () {
      this.$refs.submitAServiceModal.show = false
    }
  }
}
</script>
