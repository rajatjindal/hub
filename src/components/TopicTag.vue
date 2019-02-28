<template>
  <url-link
    :to="{ name: 'services', query: { search: text, c: undefined }}"
    class="tag"
  >
    <slot/>
  </url-link>
</template>

<script>
export default {
  data: () => ({
    text: ''
  }),
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
  font-weight: 600;
  color: nth($grays, 3);
  transition: all 0.3s;

  &:hover {
    text-decoration: none;
    filter: brightness(0.95);
  }
}
</style>
