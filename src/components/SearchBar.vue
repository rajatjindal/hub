<template>
  <form @submit.prevent="search">
    <a-input color="white" class="input search-bar" type="text" placeholder="Search Hub" v-model="searchInput" aria-label="Search Hub"/>
  </form>
</template>

<script>
import ServiceSummary from '@/components/ServiceSummary'

export default {
  name: 'SearchResults',
  props: ['value'],
  data: function () {
    return {
      searchInput: this.value || ''
    }
  },
  methods: {
    search: function () {
      this.$router.push(`/search?q=${this.searchInput}`)
    }
  },
  components: {
    ServiceSummary
  }
}
</script>

<style scoped lang="sass">
.input.search-bar
  width: 100%
  z-index: 1
  position: relative
</style>
