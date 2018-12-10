<template>
  <div class="service-new" v-if="!isUserRefreshing">
    <div class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <h2 class="title is-2">Choose a repository:</h2>
            <div class="tile is-ancestor">
              <div class="tile is-parent is-vertical">
                <transition-group tag="div" name="fade">
                  <div v-for="(r, index) in repos" :key="`repos-on-list-item-${index}`" class="tile is-child repo">
                    <div class="level">
                      <div class="level-left">
                        <service-summary :title="r.name" :is-alias="false" :description="emojify(r.description)" :tags="r.topics" />
                      </div>
                      <div class="level-right">
                        <a-button v-if="r.microservice" state="primary">Choose</a-button>
                        <a-button v-else state="secondary" outline disabled>Choose</a-button>
                      </div>
                    </div>
                  </div>
                </transition-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import repos from '@/assets/repos.json'
// import axios from 'axios'
import emoji from 'node-emoji'
import { mapGetters } from 'vuex'
import ServiceSummary from '@/components/ServiceSummary'

export default {
  name: 'NewService',
  components: { ServiceSummary },
  data: () => ({ repos: [] }),
  computed: mapGetters(['getUser', 'isUserLoggedIn', 'isUserRefreshing']),
  watch: {
    'isUserRefreshing': function (refreshing) {
      if (!refreshing && !this.isUserLoggedIn) {
        this.$router.push({ name: 'hub' })
      }
    }
  },
  mounted: function () {
    this.repos = repos
    for (let repo of this.repos) {
      if (['jwt', 'twitter', 'slack'].includes(repo.name)) {
        const idx = this.repos.indexOf(repo)
        repo.microservice = true
        this.repos.splice(idx, 1, repo)
      }
      // axios.get('https://api.github.com/repos/JeanBarriere/' + repo.name + '/contents/microservice.yml').then((res) => {
      //   if (res.data.name) {
      //     const idx = this.repos.indexOf(repo)
      //     repo.microservice = true
      //     this.repos.splice(idx, 1, repo)
      //   }
      // })
    }
  },
  methods: {
    emojify: function (description) {
      return emoji.emojify(description, () => '🐙')
    }
  }
}
</script>

<style lang="scss" scoped>
.repo {
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  border-top: 1px solid #c7c7c7;

  .level-left {
    max-width: 85%;
  }

  &:last-child {
    border-bottom: 1px solid #c7c7c7;
  }
}
</style>
