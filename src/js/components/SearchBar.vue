<template>
  <form @submit.prevent="search">
    <a-input color="white" class="input search-bar" type="text" placeholder="Search Hub" v-model="searchInput" aria-label="Search Hub"/>
  </form>
</template>

<script>
import AInput from '../../../node_modules/asyncy-ui-components/dist/AInput';
import ServiceSummary from '../components/ServiceSummary';

export default {
  name: 'SearchResults',
  props: ['value'],
  data() {
    return {
      searchInput: this.value || '',
    };
  },
  methods: {
    search() {
      this.$router.push(`/search?q=${this.searchInput}`);
    },
  },
  components: {
    ServiceSummary,
    AInput,
  },
};
</script>

<style scoped lang="styl">
.input.search-bar
  width 100%
  z-index 1
  position relative

</style>
