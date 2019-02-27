<template>
  <router-link :to="`/article/${title}`">
    <div class="card article">
      <div class="card-image">
        <figure class="image is-5by3">
          <div
            v-if="isLoading"
            class="loading-shimmer article-image"
          />
          <img
            v-else
            src="https://bulma.io/images/placeholders/480x480.png"
            alt="Placeholder image"
          >
        </figure>
      </div>
      <div class="card-content">
        <template v-if="isLoading">
          <div class="loading-shimmer title"/>
          <div class="loading-shimmer description"/>
        </template>
        <template v-else>
          <h3 class="is-size-5 title has-text-weight-bold has-text-uppercase has-text-dark">{{ title }}</h3>
          <p class="is-size-6 has-text-dark">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae facilis libero nobis aspernatur!</p>
          <a-button
            state="secondary"
            size="small"
            arrow
          >
            Read More
          </a-button>
        </template>
      </div>
    </div>
  </router-link>
</template>

<script>
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

<style lang="scss">
.card.article {
  border-radius: .5rem;
  overflow: hidden;

  box-shadow: 0 8px 32px -16px rgba(0, 0, 0, 0.4);
  transition: box-shadow,transform .1s ease-in;

  &:hover {
    @include desktop {
      transform: translateY(-4px);
    }
    box-shadow: 0 8px 32px -16px rgba(0, 0, 0, 0.8);
  }

  .button {
    margin-top: 2rem;
  }
}
</style>
