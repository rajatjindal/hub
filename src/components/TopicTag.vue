<template>
  <url-link :to="linkTo">
    <span class="tag">
      <slot/>
    </span>
  </url-link>
</template>

<script>
export default {
  data: () => ({
    text: ''
  }),
  computed: {
    linkTo: function () {
      return `/tags/${this.text}`
    }
  },
  mounted: function () {
    this.text =
      this.$slots.default &&
      this.$slots.default.length > 0 &&
      this.$slots.default[0].text
  }
}
</script>

<style scoped lang="scss">
.tag {
  font-size: 0.8em;
  transition: all 0.3s;

  &:hover {
    filter: brightness(0.95);
  }
}
</style>
