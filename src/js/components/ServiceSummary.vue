<template>
  <div :class="{ disabled: !title, summary: true }">
    <router-link :to="`/service/${title}`">
      <div class="media" v-if="!isLoading && title">
        <div class="media-left">
          <div class="recently-added-image"></div>
        </div>
        <div class="media-content">
          <h4>{{ title }}</h4>
          <div>{{ (description || title) | emoji }}</div>
          <div v-if="tags" class="tags-container">
            <span class="tag-container" v-for="t in tags" :key="t"><topic-tag>{{ t }}</topic-tag></span>
          </div>
        </div>
      </div>
      <div class="media" v-else-if="isLoading">
        <div class="media-left">
          <div  class="loading-shimmer recently-added-image"></div>
        </div>
        <div class="media-content">
          <div class="loading-shimmer title"/>
          <div class="loading-shimmer description"/>
          <div class="loading-shimmer tags"/>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script scoped>
export default {
  props: ['title', 'description', 'tags'],
  computed: {
    isLoading() {
      return !this.title;
    },
  },
};
</script>

<style scoped lang="styl">
.disabled
  pointer-events none

a
  color black

.recently-added-image
  min-width: 65px;
  height: 65px;
  border-radius: 4px;
  border: 1px solid #ccc;

h4
  margin-top: 0;
  margin-bottom: 0.3em;

p
  margin: 0;

.media
  opacity 1

.tags-container
  margin-top: 1em;

  .tag-container
    margin-right: 0.4em;

.loading-shimmer
  margin-bottom 0.8em

  &.recently-added-image
    border-color transparent

  &.title
    width 200px
    height 16px

  &.description
    width 250px
    height 11px

  &.tags
    margin-top 1.4em
    width 100px
    height 1em

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
