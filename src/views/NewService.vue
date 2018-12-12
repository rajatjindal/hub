<template>
  <div class="service-new" v-if="!isUserRefreshing">
    <div class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-four-fifths">
            <a-steps ref="steps" lock-headers>
              <div class="column is-full" slot-scope="stepsProps">
                <a-step class="column is-full">
                  <span slot="header">
                      1. <span><font-awesome-icon :icon="['fab', 'github']" /> Connect to Github</span>
                  </span>
                  <a-card>
                    <h2 class="title is-3">Continuous Deployment</h2>
                    <p class="subtitle">Connect to Github where your sources are hosted. When you push to Git, we'll update your service on our servers and deploy the result.</p>
                    <a-button state="neutral" @click="stepsProps.next()"><font-awesome-icon :icon="['fab', 'github']" /> Signin with Github</a-button>
                  </a-card>
                </a-step>
                <a-step>
                  <span slot="header">
                      2. <span><font-awesome-icon icon="code-branch" /> Choose a repository</span>
                  </span>
                  <div class="tile is-parent is-vertical">
                    <div class="search level">
                      <div class="level-left">
                        <h3><img class="avatar" :src="`https://avatars.githubusercontent.com/${getUser.username}?s=64`" alt="user" /> {{ getUser.username }}</h3>
                      </div>
                      <div class="level-right">
                        <a-input addon-left-icon="search" placeholder="Search a repository" v-model="search" />
                      </div>
                    </div>
                    <transition-group tag="div" name="fade">
                      <div v-for="(r, index) in searchedRepos" :key="`repos-on-list-item-${index}`" class="tile is-child repo">
                        <div class="level">
                          <div class="level-left">
                            <service-summary :title="r.name" :is-alias="false" :description="emojify(r.description)" :tags="r.topics" />
                          </div>
                          <div class="level-right">
                            <a-button v-if="r.microservice" @click="choose(r)" state="primary">Choose</a-button>
                            <a-button v-else state="secondary" outline disabled>Choose</a-button>
                          </div>
                        </div>
                      </div>
                      <div key="repos-on-list-no-items" v-show="searchedRepos.length === 0" class="repo">
                        <div class="text--center">
                          <h3 class="subtitle is-4">No repositories found</h3>
                        </div>
                      </div>
                    </transition-group>
                  </div>
                </a-step>
                <a-step>
                  <span slot="header">
                      3. <span><font-awesome-icon icon="file-signature" /> Additional informations</span>
                  </span>
                  <div class="form" v-if="service.repo">
                    <div class="inputs">
                      <a-input disabled v-model="service.serviceName" label="Service name" />
                      <a-input v-model="service.name" label="Name*" />
                      <a-input v-model="service.description" label="Description*" />
                      <div class="select-group">
                        <label>Branch*</label>
                        <v-select v-model="service.branch" label="Select" :options="service.branches" />
                      </div>
                    </div>
                    <div class="submit">
                      <a-button state="neutral" outline size="l" @click="stepsProps.prev()">Change repository</a-button>
                      <a-button state="primary" size="l">Submit service</a-button>
                    </div>
                  </div>
                </a-step>
              </div>
            </a-steps>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import repos from '@/assets/repos.json'
import axios from 'axios'
import emoji from 'node-emoji'
import { mapGetters } from 'vuex'
import ServiceSummary from '@/components/ServiceSummary'

export default {
  name: 'NewService',
  components: { ServiceSummary },
  data: () => ({ repos: [], serviceRepo: undefined, search: '', service: { repo: undefined, branches: [], name: '', version: '', icon: '', branch: 'master', serviceName: '', description: '', public: true } }),
  filters: {
    spliceSearch: function (arr) {
      return arr.splice().filter(a => a.name.includes(this.search))
    }
  },
  computed: {
    ...mapGetters(['getUser', 'isUserLoggedIn', 'isUserRefreshing']),
    searchedRepos: function () {
      return this.repos.filter(r => r.name.toLowerCase().includes(this.search.toLowerCase()) || (r.description && r.description.toLowerCase().includes(this.search.toLowerCase())))
    }
  },
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
    },
    choose: function (r) {
      this.service.serviceName = r.full_name
      this.service.branches = [r.default_branch]
      this.service.repo = r
      axios.get(`https://api.github.com/repos/${this.service.repo.full_name}/branches`).then((res) => {
        this.service.branches = res.data.reduce((arr, b) => [...arr, b.name], [])
      })
      this.$refs.steps.nextStep()
    }
  }
}
</script>

<style lang="scss">
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

.search {
  margin: 2rem 0;

  h3 {
    align-items: center;
    display: flex;
  }
}

.avatar {
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  border-radius: 1.5rem;
  border: .2rem solid gray(100);
}

.select-group {
  margin-top: 1rem;
}

.form {
  .submit {
    margin-left: auto;
    float: right;
    margin-top: 2rem;
  }
}

.v-select.searchable {
  .dropdown-toggle {
    border-radius: 0.5rem;
    border-color: gray(300);
    .vs__selected-options {
      padding: 0.4rem 1rem;

      .selected-tag {
        font-size: 1rem;
      }
      input {
        font-size: 1rem;
      }
    }
    .vs__actions {
      padding: 0 1rem 0 1rem;
      .clear {
        span {
          position: absolute;
          top: 0.9rem;
          right: 2.5rem;
        }
      }
    }
  }
  .dropdown-menu {
    width: 100%;
    top: 2.5rem;
    border-color: gray(300);
  }
}
</style>
