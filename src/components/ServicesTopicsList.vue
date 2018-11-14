<template>
  <div class="sticky topics">
    <h5 class="title">Topics</h5>
      <transition-group name="fade" tag="ul" class="topics-list">
        <li v-for="topic in topics" :key="topic.name" class="topic-item" :class="{ active: topic.icon === active }" @click="active = topic.icon">
          <services-icon :type="topic.icon" :active="topic.icon === active" />
          {{ topic.name }}
          <!-- <topic-tag>{{topic}}</topic-tag> -->
        </li>
      </transition-group>
      <ul class="topics-list" v-if="topics.length <= 0 && isLoading">
        <li class="topic-item">
          <div class="loading-shimmer"></div>
        </li>
        <li class="topic-item">
          <div class="loading-shimmer"></div>
        </li>
        <li class="topic-item">
          <div class="loading-shimmer"></div>
        </li>
      </ul>
      <p v-else-if="topics.length <= 0 && !isLoading" class="no-topics">No topics found.</p>
  </div>
</template>

<script>
import ServicesIcon from '@/components/ServicesIcon'

export default {
  props: ['value'],
  components: { ServicesIcon },
  data: () => ({
    isLoading: true,
    active: 'all'
  }),
  mounted: function() {
    // currently should only happen when data is loaded via cache
    if (this.value && this.value.length <= 0) {
      this.isLoading = false
    }
  },
  watch: {
    value: function() {
      this.isLoading = false
    }
  },
  computed: {
    topics: function() {
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
        name: 'Worker',
        icon: 'worker'
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
  }
}
</script>

<style lang="scss">
@include breakpoint(max m) {
  .topic-item {
    display: inline-block;
    margin-right: 0.3em;
  }
}

.sticky {
  position: sticky;

  &.topics {
    top: 4rem + 1.5rem;
    margin-bottom: 3rem;
  }
}

.topics-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;

  .topic-item {
    transition: all .1s ease-out;
    margin-bottom: 0.6em;
    margin-right: 0.6em;
    display: flex;
    align-items: center;
    height: 2rem;
    cursor: pointer;
    & + .topic-item {
      margin-top: .5rem;
    }
    &.active {
      color: state(primary);
      font-weight: bold;
    }

    &:hover:not(.active) {
      color: lighten(state(primary), 25%);
      svg {
        .service-icon.filled {
          fill: lighten(state(primary), 25%) !important;
        }
        .service-icon.stroked {
          stroke: lighten(state(primary), 25%) !important;
        }
      }
    }

    svg {
      margin-right: 1rem;
    }
  }

  @include breakpoint(m) {
    .topic-item {
      width: 100%;
    }
  }
}

.no-topics {
  font-size: 0.9em;
  color: #aaa;
}

.loading-shimmer {
  margin-bottom: 0;
  height: 1.5em;
  width: 100px;
}
</style>
