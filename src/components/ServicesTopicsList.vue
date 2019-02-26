<template>
  <div class="sticky topics">
    <transition-group
      name="fade"
      tag="ul"
      class="topics-list">
      <li
        v-for="topic in topics"
        :key="topic.name"
        :class="{ 'active': topic.name === active }"
        class="topic-item"
        @click="active = topic.name">
        {{ topic.name }}
        <span
          v-if="topic.name === active"
          class="delete"
          @click.stop="active = ''" />
      </li>
    </transition-group>
    <ul
      v-if="topics.length <= 0 && isLoading"
      class="topics-list">
      <li class="topic-item">
        <div class="loading-shimmer"/>
      </li>
      <li class="topic-item">
        <div class="loading-shimmer"/>
      </li>
      <li class="topic-item">
        <div class="loading-shimmer"/>
      </li>
    </ul>
    <p
      v-else-if="topics.length <= 0 && !isLoading"
      class="no-topics">No topics found.</p>
  </div>
</template>

<script>
import ServicesIcon from '@/components/ServicesIcon'

export default {
  components: { ServicesIcon },
  props: {
    category: {
      type: String,
      default: undefined
    }
  },
  data: () => ({
    isLoading: false,
    active: ''
  }),
  computed: {
    topics: function () {
      return [{
        name: 'All Services',
        icon: 'all'
      }, {
        name: 'Popular',
        icon: 'popular'
      }, {
        name: 'Authentication',
        icon: 'auth'
      }, {
        name: 'CMS',
        icon: 'cms'
      }, {
        name: 'Database',
        icon: 'db'
      }, {
        name: 'Logging',
        icon: 'log'
      }, {
        name: 'Memory Store',
        icon: 'memory'
      }, {
        name: 'Messaging',
        icon: 'messaging'
      }, {
        name: 'Monitoring',
        icon: 'monitoring'
      }, {
        name: 'Optimization',
        icon: 'optimization'
      }, {
        name: 'Search',
        icon: 'search'
      }, {
        name: 'Social Media',
        icon: 'social'
      }, {
        name: 'Video Processing',
        icon: 'videop'
      }, {
        name: 'Image Processing',
        icon: 'imagep'
      }, {
        name: 'Text Processing',
        icon: 'textp'
      }, {
        name: 'Machine Learning',
        icon: 'ml'
      }, {
        name: 'Programming Language',
        icon: 'lang'
      }, {
        name: 'Developer Tools',
        icon: 'devtool'
      }, {
        name: 'IoT',
        icon: 'iot'
      }, {
        name: 'Worker',
        icon: 'worker'
      }, {
        name: 'Sorting',
        icon: 'sorting'
      }, {
        name: 'Filtering',
        icon: 'filtering'
      }, {
        name: 'Strings',
        icon: 'strings'
      }]
      // const inputTopics = this.value || []
      // const allTopics = inputTopics.reduce(
      //   (acc, topics) => acc.concat(topics),
      //   []
      // )
      // const uniqueTopics = Array.from(new Set(allTopics))

      // // alphanumeric descending sort
      // uniqueTopics.sort((topic1, topic2) => {
      //   if (topic1 < topic2) {
      //     return -1
      //   }
      //   if (topic1 > topic2) {
      //     return 1
      //   }
      //   return 0
      // })

      // return uniqueTopics.filter(t => t !== undefined)
    }
  },
  watch: {
    active: function (value) {
      this.$emit('select', value)
    }
  },
  mounted: function () {
    if (this.topics.reduce((arr, v) => [...arr, v.name], []).includes(this.category)) {
      this.active = this.category
    } else {
      this.$emit('select', '')
    }
    // if (this.value && this.value.length <= 0) {
    //   this.isLoading = false
    // }
  }
}
</script>
