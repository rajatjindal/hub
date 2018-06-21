<template>
  <form @submit.prevent="search">
    <input class="input search-bar" type="text" placeholder="Search Hub" v-model="searchInput">
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

<style scoped lang="styl">
.input.search-bar
  width 100%
  background-color white

.input.search-bar:focus
  color black

.input
  font-size 1em
  border-radius 6px
  border 1px solid #ccc
  padding 15px 20px
  margin-bottom 10px
  background-color rgba(35,35,35,1)
  color rgba(190,190,190,1)
  transition all 0.2s ease-in-out
  outline none

.input:focus
  border-color #515CF9
  filter brightness(120%)
  color white

.input:invalid
  border-color #F74545
  color #F74545
</style>
