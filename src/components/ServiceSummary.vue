<template>
  <div :class="{ disabled: !title, summary: true }">
    <router-link :to="(isAlias ? `/service/` : '/r/') + title">
      <div
        v-if="!isLoading && title"
        class="media">
        <div class="media-left">
          <div
            :style="{ backgroundColor: color }"
            class="service-image">{{ firstLetterCapitalized }}</div>
        </div>
        <div class="media-content">
          <h3 class="is-size-6 has-text-weight-bold has-text-dark">{{ title }}</h3>
          <p class="is-size-8 has-text-gray-3 description">{{ (description || title) | emoji }}</p>
          <div
            v-if="tags"
            class="tags">
            <topic-tag
              v-for="t in tags"
              :key="t">{{ t }}</topic-tag>
          </div>
        </div>
      </div>
      <div
        v-else-if="isLoading"
        class="media">
        <div class="media-left">
          <div class="loading-shimmer service-image"/>
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
import md5 from 'crypto-js/md5'

export default {
  props: {
    title: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    },
    tags: {
      type: Array,
      default: undefined
    },
    isAlias: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    color: function () {
      const randomNumFromTitle = md5(this.title).words[0]
      const numBetweenZeroAndOne = Math.abs(randomNumFromTitle) / 2147483647
      const hue = numBetweenZeroAndOne * 360
      return `hsla(${hue}, 45%, 65%, 1)`
    },
    firstLetterCapitalized: function () {
      return this.title && this.title.slice(0, 1).toUpperCase()
    },
    isLoading: function () {
      return !this.title
    }
  }
}
</script>

<style scoped lang="scss">
.service-image {
  min-width: 4.5rem;
  height: 4.5rem;
  border-radius: .5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6em;
  color: white;
}

.tags {
  margin-top: .75rem;
}

.loading-shimmer {
  margin-bottom: 0.8em;

  &.service-image {
    border-color: transparent;
  }

  &.title {
    width: 200px;
    height: 16px;
  }

  &.description {
    width: 250px;
    height: 11px;
  }

  &.tags {
    margin-top: 1.4em;
    width: 100px;
    height: 1em;
  }
}
</style>
