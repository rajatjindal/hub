<template>
<url-link :to="linkTo">
  <span class="tag">
    <slot></slot>
  </span>
</url-link>
</template>

<script>
export default {
  data() {
    return {
      text: '',
    };
  },
  computed: {
    linkTo() {
      return `/tags/${this.text}`;
    },
  },
  mounted() {
    this.text = this.$slots.default &&
      this.$slots.default.length > 0 &&
      this.$slots.default[0].text;
  },
};
</script>

<style scoped lang="styl">
.tag
  font-size 0.8em
  transition all 0.3s
.tag:hover
  filter brightness(0.95)
</style>
