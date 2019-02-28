<template>
  <div :class="['a-section-container', {'a-section-absolute-header': absoluteHeader}, {'a-section-shadowed': shadowed}]">
    <div class="a-section">
      <div
        v-if="hasHeader"
        :class="['a-section-header', {'a-section-large-header': largeHeader}]">
        <div class="media">
          <div class="media-left"><slot name="header-left" /></div>
          <div class="media-content"><slot name="header-centered" /></div>
          <div class="media-right"><slot name="header-right" /></div>
        </div>
        <div
          v-if="largeHeader"
          class="columns is-vcentered is-gapless">
          <div class="column is-narrow">
            <slot name="header-divider-content-left" />
          </div>
          <div class="column">
            <div
              :data-content="dividerContent"
              :data-align="dividerAlign"
              class="is-divider"
            />
          </div>
          <div class="column is-narrow">
            <slot name="header-divider-content-right" />
          </div>
        </div>
      </div>
      <div :class="['a-section-body', 'columns', {'absolute-header': !hasHeader && absoluteHeader}, {'no-header': !hasHeader}]">
        <div
          v-if="$slots.sidebar"
          class="a-section-body-sidebar column is-one-quarter">
          <slot name="sidebar" />
        </div>
        <div :class="['a-section-body-content-container', 'column', {'a-section-body-padded': bodyPadded}]">
          <div class="a-section-body-content">
            <slot />
          </div>
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
    },
    bodyPadded: {
      type: Boolean,
      default: false
    },
    shadowed: {
      type: Boolean,
      default: false
    },
    dividerContent: {
      type: String,
      default: undefined
    },
    dividerAlign: {
      type: String,
      default: undefined
    }
  },
  computed: {
    hasHeader: function () {
      return this.$slots['header-left'] || this.$slots['header-centered'] || this.$slots['header-right']
    }
  }
}
</script>

<style lang="scss">
.a-section-container {
  padding-bottom: 7.5rem;
  & + .a-section-container {
    padding-bottom: 3rem;
  }
}
.a-section {
  padding: 0;
  position: relative;
  border-radius: .625rem;
  // padding-bottom: .75rem;
  .a-section-header {
    height: 3.5rem;
    padding: .5rem .5rem .5rem 1.75rem;
    display: flex;
    flex: 1 1 100%;
    align-items: center;
    background-color: $white;
    border-top-left-radius: .625rem;
    border-top-right-radius: .625rem;
    .media {
      align-items: center;
      width: 100%;
    }
    &:not(.a-section-large-header) {
      border-bottom: 1px solid $light;
    }
    &.a-section-large-header {
      height: 10rem;
      padding: 1rem 3rem;
      border-bottom: none;
      .media {
        align-items: center;
        padding: .5rem 0 1rem;
        // border-bottom: 1px solid nth($grays, 4);
      }
    }
  }

  .a-section-body {
    &.no-header {
      .a-section-body-sidebar {
        border-top-left-radius: .625rem;
      }
      .a-section-body-content {
        &:first-child {
          border-top-left-radius: .625rem;
        }
        border-top-right-radius: .625rem;
      }
      &.absolute-header {
        margin-top: -5rem;
      }
    }
    margin: 0;
    padding: 0;
    .a-section-body-sidebar {
      border-bottom-left-radius: .625rem;
      background-color: lighten($light, 2.4%);
    }
    .a-section-body-content-container {
      background-color: $white;
      padding: 2rem 3rem;
      .a-section-body-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
      }
      border-bottom-right-radius: .625rem;
      &:first-child {
        border-bottom-left-radius: .625rem;
      }
      .section:not(.full) {
        padding-right: 8rem;
      }
      &.a-section-body-padded {
        padding: 2rem 6.5rem;
      }
    }
  }
}

.a-section-shadowed {
  .a-section {
    box-shadow: 0 .4rem 1rem 0 rgba($black, .09);
  }
}

.a-section-absolute-header {
  .a-section {
    .a-section-header {
      position: absolute;
      top: -3.5rem;
      right: 0;
      left: 0;
    }
    .a-section-body {
      .a-section-body-content {
        &.a-section-body-padded {
          margin-top: 4.5rem;
        }
      }
    }
  }
}
</style>
