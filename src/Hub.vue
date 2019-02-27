<template>
  <div id="hub">
    <!-- <a-cookie /> -->
    <a-header
      @search="onSearch"
      @open-modal="openSubmitAServiceModal" />
    <div class="main-container">
      <transition
        name="view-fade"
        mode="out-in">
        <router-view
          ref="routerView" />
      </transition>
    </div>
    <a-footer dark />
    <submit-service-modal
      id="submit-service-modal"
      ref="submitAServiceModal" />
  </div>
</template>

<script>
import SubmitServiceModal from '@/components/SubmitAServiceModal'
import AHeader from '@/components/Header'
import { mapGetters } from 'vuex'

export default {
  name: 'Hub',
  components: {
    SubmitServiceModal,
    AHeader
  },
  data: () => ({ search: '', submit: false }),
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
      this.$refs.submitAServiceModal.show()
    },
    onSearch: function ({ search, submit }) {
      this.search = search
      if (submit && this.search.trim().length === 0) {
        this.$router.push({ name: 'services' })
      } else if (submit && this.search.trim().length > 0) {
        this.$router.push({ name: 'services', query: { search: this.search.trim() } })
      }
    }
  }
}
</script>
