<template>
  <form @submit.prevent="search">
    <input class="input" type="text" placeholder="Search Hub" v-model="searchInput">
    <div v-if="error">{{error}}</div>
  </form>
</template>

<script>
import ServiceSummary from '../components/ServiceSummary';

export default {
  name: 'SearchResults',
  props: ['value'],
  data() {
    return {
      searchInput: this.value || '',
      error: '',
    };
  },
  methods: {
    search() {
      if (this.searchInput.length > 0) {
        this.$router.push(`/search?q=${this.searchInput}`);
      } else {
        this.error = 'Please input something.';
      }
    },
  },
  components: {
    ServiceSummary,
  },
};
</script>

<style scoped>
</style>
