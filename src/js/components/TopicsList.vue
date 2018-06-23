<template>
  <div>
    <h4>Topics</h4>
    <ul class="topics-list" v-if="topics.length > 0">
      <li class="topic-item" v-for="topic in topics" :key="topic">
        <div><topic-tag>{{topic}}</topic-tag></div>
      </li>
    </ul>
    <p v-else class="no-topics">No topics found.</p>
  </div>
</template>

<script>
export default {
  props: ['value'],
  computed: {
    topics() {
      const inputTopics = this.value || [];
      const allTopics = inputTopics.reduce((acc, topics) => acc.concat(topics), []);
      const uniqueTopics = Array.from(new Set(allTopics));

      // alphanumeric descending sort
      uniqueTopics.sort((topic1, topic2) => {
        if (topic1 < topic2) {
          return -1;
        }
        if (topic1 > topic2) {
          return 1;
        }
        return 0;
      });

      return uniqueTopics;
    },
  },
};
</script>

<style scoped lang="styl">
@media (max-width: 768px)
  .topic-item
    display inline-block
    margin-right 0.3em

.topics-list
  list-style none
  padding-left 0

  .topic-item
    margin-bottom 0.4em

.no-topics
  font-size 0.9em
  color #aaa
</style>
