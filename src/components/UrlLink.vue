<template>
  <a
    v-if="(to || '').startsWith('http')"
    :href="to"><slot/></a>
  <router-link
    v-else
    :to="to"><slot/></router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  }
}
</script>
