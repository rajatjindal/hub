<template>
  <div class="sticky topics">
    <h5 class="title">Topics</h5>
    <transition-group
      name="fade"
      tag="ul"
      class="topics-list">
      <li
        v-for="topic in topics"
        :key="topic.name"
        :class="{ active: topic.name === active }"
        class="topic-item"
        @click="active = topic.name">
        <services-icon
          :type="topic.icon"
          :active="topic.name === active" />
        {{ topic.name }}
        <span
          class="close"
          @click.stop="active = ''"><font-awesome-icon icon="times" /></span>
          <!-- <topic-tag>{{topic}}</topic-tag> -->
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

<style lang="scss">
@include touch {
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

    .title {
      padding-top: 0 !important;
    }
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
    .close {
      display: none;
    }
    & + .topic-item {
      margin-top: .5rem;
    }
    &.active {
      color: $primary;
      font-weight: bold;

      .close {
        display: flex;
        margin-left: auto;
        border-radius: 1rem;
        height: 2rem;
        width: 2rem;
        background-color: gray(100);
        color: gray(300);
        align-items: center;
        justify-content: center;
        svg { margin-right: 0; }
      }
    }

    &:hover:not(.active) {
      color: lighten($primary, 25%);
      svg {
        .service-icon.filled {
          fill: lighten($primary, 25%) !important;
        }
        .service-icon.stroked {
          stroke: lighten($primary, 25%) !important;
        }
      }
    }

    svg {
      margin-right: 1rem;
    }
  }

  @include desktop {
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
