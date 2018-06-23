<template>
  <div class="index">
    <div class="columns">
      <div class="column is-one-fifth sidebar">
        <slot name="sidebar"/>
      </div>
      <div class="column is-8 main-container">
        <slot name="body"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="styl">
@media (max-width: 768px)
  .sidebar
    order 1
    flex-basis 100%
    flex-grow 1

.index
  min-height 650px

.columns
  max-width 1100px
  margin 0 auto
  text-align left
  display flex
  flex-wrap wrap
</style>
