<template>
  <a
    v-if="typeof to === typeof ''"
    :href="to"><slot/></a>
  <router-link
    v-else
    :to="to"><slot/></router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      required: true
    }
  }
}
</script>
