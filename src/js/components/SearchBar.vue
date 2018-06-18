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
      this.$router.push(`/search?q=${this.searchInput}`);
    },
  },
  components: {
    ServiceSummary,
  },
};
</script>

<style scoped>
</style>
