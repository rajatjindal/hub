<template>
  <router-link :to="`/service/${title}`">
    <div class="media">
      <div class="media-left">
        <div v-if="!loading" class="recently-added-image"></div>
        <div v-else class="loading recently-added-image"></div>
      </div>
      <div class="media-content" v-if="!loading">
        <h4>{{ title }}</h4>
        <div>{{ (description || title) | emoji }}</div>
        <div v-if="tags" class="tags-container">
          <span class="tag-container" v-for="t in tags" :key="t"><topic-tag>{{ t }}</topic-tag></span>
        </div>
      </div>
      <div class="media-content" v-else>
      </div>
    </div>
  </router-link>
</template>

<script scoped>
export default {
  props: ['title', 'description', 'tags', 'loading'],
  data() {
    return {
      isLoading: true,
    };
  },
};
</script>

<style scoped lang="styl">
a
  color black

.loading
  -webkit-animation: animation-shimmering 1.5s linear infinite;
  animation: animation-shimmering 1.5s linear infinite;
  background-image: -webkit-linear-gradient(right, #f6f8f9 0%, #edf1f2 50%, #f6f8f9 100%);
  background-image: linear-gradient(-90deg, #f6f8f9 0%, #edf1f2 50%, #f6f8f9 100%);
  background-position: -300px 0;
  background-repeat: no-repeat;
  background-size: 300px 100%;
  background-color: #f6f8f9;
  border-radius: 3px;
  height: 11px;
  height: 20px;
  margin: 15px 0;
  width: 200px;

.recently-added-image
  min-width: 65px;
  height: 65px;
  border-radius: 4px;
  border: 1px solid #ccc;

h4
  margin-top: 0;
  margin-bottom: 0.3em;

p
  margin: 0;

.tags-container
  margin-top: 1em;

  .tag-container
    margin-right: 0.2em;
</style>
