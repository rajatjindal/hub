<template>
  <div :class="{ disabled: !title, summary: true }">
    <router-link :to="`/service/${title}`">
      <div class="media" v-if="!isLoading && title">
        <div class="media-left">
          <div class="service-image" :style="{ backgroundColor: color }">{{ firstLetterCapitalized }}</div>
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
          <div  class="loading-shimmer service-image"></div>
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
import md5 from 'crypto-js/md5';

export default {
  props: ['title', 'description', 'tags'],
  computed: {
    color() {
      const randomNumFromTitle = md5(this.title).words[0];
      const numBetweenZeroAndOne = Math.abs(randomNumFromTitle) / 2147483647;
      const hue = numBetweenZeroAndOne * 360;
      return `hsla(${hue}, 45%, 65%, 1)`;
    },
    firstLetterCapitalized() {
      return this.title && this.title.slice(0, 1).toUpperCase();
    },
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

.service-image
  min-width: 65px;
  height: 65px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6em;
  color: white;

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

  &.service-image
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
