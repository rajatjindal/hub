<template>
  <a v-if="(to || '').startsWith('http')" :href="to"><slot></slot></a>
  <router-link v-else :to="to"><slot></slot></router-link>
</template>

<script>
export default {
  props: ['to'],
};
</script>
