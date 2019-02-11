<template>
  <div :class="[{disabled: !title}, 'article']">
    <router-link :to="`/article/${title}`">
      <div
        v-if="!isLoading && title"
        class="media">
        <div class="media-left">
          <div class="article-image"/>
        </div>
        <div class="media-content">
          <h3>{{ title }}</h3>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae facilis libero nobis aspernatur!</div>
          <!-- <div>{{ (description) | emoji }}</div> -->
        </div>
      </div>
      <div
        v-else-if="isLoading"
        class="media">
        <div class="media-left">
          <div class="loading-shimmer article-image"/>
        </div>
        <div class="media-content">
          <div class="loading-shimmer title"/>
          <div class="loading-shimmer description"/>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script scoped>
export default {
  name: 'ArticleSummary',
  props: {
    title: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    }
  },
  computed: {
    isLoading: function () {
      return !this.title
    }
  }
}
</script>

<style scoped lang="scss">
.disabled {
  pointer-events: none;
}

a {
  color: $dark;
}

.article-image {
  min-width: 125px;
  height: 125px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $dark;
}

h4 {
  margin-top: 0;
  margin-bottom: 0.3em;
}

p {
  margin: 0;
}

.media {
  opacity: 1;
  border-radius: .25rem;
  padding: .5rem;
  &:hover {
    background-color: $light;
  }
  .media-content {
    height: 125px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h3 {
      color: darken($dark, 15%);
      padding: 0 !important;
      margin-bottom: .5rem !important;
    }
  }
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
}
</style>
