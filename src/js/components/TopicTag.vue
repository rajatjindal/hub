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
