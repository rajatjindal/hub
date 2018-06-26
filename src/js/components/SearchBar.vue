<template>
  <form @submit.prevent="search">
    <input class="input search-bar" type="text" placeholder="Search Hub" v-model="searchInput" aria-label="Search Hub">
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
  z-index 1
  position relative

.input.search-bar:focus
  color black

.input
  font-size 1em
  border-radius 5px
  border 1px solid #C7C7C7
  padding 15px 20px
  margin-bottom 10px
  background-color #FBFBFB
  box-shadow 0 1px 2px 0 rgba(208,208,208,0.5)
  color rgba(190,190,190,1)
  transition all 0.2s ease-in-out
  outline none
  background url(../../assets/search.svg) no-repeat
  background-position calc(100% - 18px) 50%
  background-size 18px 18px

.input:focus
  border-color #515CF9
  filter brightness(120%)
  color white

.input:invalid
  border-color #F74545
  color #F74545
</style>
