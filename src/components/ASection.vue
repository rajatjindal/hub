<template>
  <div :class="['container', {'a-section-absolute-header': absoluteHeader}]">
    <div class="a-section">
      <div :class="['a-section-header', {'a-section-large-header': largeHeader}]">
        <div class="media">
          <div class="media-left"><slot name="header-left" /></div>
          <div class="media-content has-spans"><slot name="header-centered" /></div>
          <div class="media-right"><slot name="header-right" /></div>
        </div>
      </div>
      <div class="a-section-body columns">
        <div
          v-if="$slots.sidebar"
          class="a-section-body-sidebar column is-one-quarter">
          <slot name="sidebar" />
        </div>
        <div :class="['a-section-body-content', 'column', {'a-section-body-padded': largeHeader}]">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ASection',
  props: {
    absoluteHeader: {
      type: Boolean,
      default: false
    },
    largeHeader: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.a-section {
  border-radius: .75rem;
  padding: 0;
  padding-bottom: 7.5rem;
  .a-section-header {
    height: 3.5rem;
    padding: 1rem;
    background-color: $white;
    border-bottom: 1px solid nth($grays, 4);
    &.a-section-large-header {
      height: 8rem;
      padding: 1rem 3rem;
      border-bottom: none;
      .media {
        padding: .5rem 0 1rem;
        border-bottom: 1px solid nth($grays, 4);
      }
    }
  }

  .a-section-body {
    margin: 0;
    padding: 0;
    .a-section-body-sidebar {
      background-color: lighten($light, 2.4%);
    }
    .a-section-body-content {
      background-color: $white;
      .section:not(.full) {
        padding-right: 8rem;
      }
      &.a-section-body-padded {
        padding: 1rem 6.5rem;
      }
    }
  }
}

.a-section-absolute-header {
  .a-section {
    border-radius: 0;
    .a-section-header {
      position: absolute;
      top: -3.5rem;
      right: 0;
      left: 0;
      border-top-left-radius: .75rem;
      border-top-right-radius: .75rem;
    }
    .a-section-body {
      .a-section-body-sidebar {
        border-bottom-left-radius: .75rem;
      }
      .a-section-body-content {
        &.a-section-body-padded {
          margin-top: 4.5rem;
        }
        &:first-child {
          border-bottom-left-radius: .75rem;
        }
        border-bottom-right-radius: .75rem;
      }
    }
  }
}
</style>
