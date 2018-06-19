<template>
  <router-link :to="`/service/${title}`">
    <div class="media">
      <div class="media-left">
        <div class="recently-added-image"></div>
      </div>
      <div class="media-content">
        <h4>{{ title }}</h4>
        <p>{{ (description || title) | emoji }}</p>
        <div v-if="tags" class="tags-container">
          <span class="tag-container" v-for="t in tags" :key="t"><topic-tag>{{ t }}</topic-tag></span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script scoped>
export default {
  name: 'RecentlyAddedTile',
  props: ['title', 'description', 'tags'],
};
</script>

<style scoped>
a {
  color: black;
}

.recently-added-image {
  min-width: 65px;
  height: 65px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

h4 {
  margin-top: 0;
  margin-bottom: 0.3em;
}

p {
  margin: 0;
}

.tags-container {
  margin-top: 1em;
}

.tag-container {
  margin-right: 0.2em;
}
</style>
