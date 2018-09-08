<template>
  <div class="index">
    <div class="columns">
      <div class="column is-one-fifth sidebar">
        <slot name="sidebar"/>
      </div>
      <div class="column is-four-fifths main-container">
        <slot name="body"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
@include breakpoint(max $bp-m) {
  .sidebar {
    order: 1;
    flex-basis: 100%;
    flex-grow: 1;
  }
}

.index {
  min-height: 650px;
  margin-top: 1.5em;
}

.columns {
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
}
</style>
