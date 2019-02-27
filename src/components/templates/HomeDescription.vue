<template>
  <div :class="['home-description-template', 'columns', 'is-vcentered', {'is-reversed': idx % 2 === 0}]">
    <div :class="['column', 'is-6', {'is-offset-2': idx % 2 === 0}]">
      <div class="image is-square">
        <img
          :alt="name"
          :src="picture"
        >
      </div>
    </div>
    <div :class="['column', 'is-4', {'is-offset-2': idx % 2 === 1}]">
      <div class="pin">
        <pin :idx="idx" />
      </div>
      <h3 class="is-size-3 has-text-gray-2 hdt-title has-text-weight-semibold">
        {{ name }}
      </h3>
      <p
        class="is-size-6 content has-text-gray-3"
        v-text="content"
      />
      <a-button
        v-if="link"
        :url="link.href"
        :route="link.name ? link : undefined"
        state="secondary"
        arrow
        class="hdt-button"
        size="small"
      >
        View More
      </a-button>
    </div>
  </div>
</template>

<script>
import Pin from '@/components/svgs/Pin'

export default {
  name: 'HomeDescriptionTemplate',
  components: { Pin },
  props: {
    idx: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    link: {
      type: Object,
      required: false,
      default: undefined
    },
    picture: {
      type: String,
      required: false,
      default: undefined
    }
  }
}
</script>

<style lang="scss">
.home-description-template {
  margin: 5rem 0;

  .pin {
    width: 3.75rem;
    height: 3.75rem;
  }

  .hdt-button {
    margin-top: .5rem;
    span {
      margin-right: 3rem;
    }
  }

  .hdt-title {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
}
</style>
