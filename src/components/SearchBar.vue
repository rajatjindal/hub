<template>
  <form @submit.prevent="search">
    <a-input addon-left-icon="search" placeholder="Search a service" v-model="input" @change="search" aria-label="Search a service" />
  </form>
</template>

<script>
export default {
  name: 'SearchBar',
  props: ['value'],
  data: function() {
    return {
      input: this.value || ''
    }
  },
  watch: {
    input: function (value) {
      if (value.trim().length === 0) {
        this.$router.push({ name: 'services' })
      }
    }
  },
  methods: {
    search: function() {
      if (this.input.trim().length > 0) {
        this.$router.push({ name: 'services', query: { search: this.input.trim() } })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.input.search-bar {
  width: 100%;
  z-index: 1;
  position: relative;
}
</style>
