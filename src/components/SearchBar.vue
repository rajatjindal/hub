<template>
  <form @submit.prevent="search">
    <a-input addon-left-icon="search" placeholder="Search Hub" v-model="input" aria-label="Search Hub" />
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
  methods: {
    search: function() {
      this.$router.push({ name: 'search', query: { q: this.input } })
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
