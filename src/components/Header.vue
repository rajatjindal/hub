<template>
  <a-nav
    logo="light"
    tag="Beta"
    type="dark"
    effect="dark"
    class="navbar"
    :hasSearch="hasSearch"
    @search="onSearch"
    @brand-click="$router.push({ name: 'hub' })"
    @support="support"
    @signin="signin"
    :items="getItems">
    <li class="nav-item dropdown" v-if="isUserLoggedIn" id="profile_dropdown" v-click-outside="close">
      <a
        href="#"
        class="nav-link profile"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        :aria-expanded="toggled"
        @click.stop="toggled = !toggled">
        <img :src="`https://avatars.githubusercontent.com/${getUser.username}?s=64`" alt="user" />
      </a>
      <transition name="navbar-dropdown">
        <div
          class="dropdown-menu dropdown-menu-right"
          aria-labelledby="profile_dropdown"
          v-show="toggled">
          <a
            class="dropdown-item"
            href="#"
            target="_blank"
            title="Logout">
            <font-awesome-icon icon="arrow-right" />
            Logout
          </a>
        </div>
      </transition>
    </li>
  </a-nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'a-header',
  computed: {
    ...mapGetters(['isUserLoggedIn', 'getUser']),
    hasSearch: function () {
      return this.$route.meta.hasSearch
    },
    getItems: function () {
      const ret = [{
        name: 'Services',
        link: '/services'
      }, {
        name: 'Functions',
        link: '/functions'
      }, {
        name: 'Apps',
        link: '/apps'
      }, {
        name: 'More',
        children: [{
          name: 'Publish',
          link: '/new-service'
        }, {
          name: 'Pricing'
        }, {
          name: 'Support',
          emit: 'support'
        }]
      }]
      if (!this.isUserLoggedIn) {
        ret.push({
          name: 'Signin with Github',
          button: 'primary',
          emit: 'signin'
        })
      }
      return ret
    }
  },
  data: () => ({ toggled: false }),
  methods: {
    onSearch: function (q) {
      this.$router.push({ name: 'search', query: { q } })
    },
    signup: function (e) {
      console.log('signup clicked', e)
    },
    support: function () {
      console.log('clicked support')
    },
    signin: function (e) {
      this.$router.push({ name: 'dashboard' })
    },
    close: function () {
      this.toggled = false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  // background-color: color(dark);

  .profile {
    padding: .75rem 0;
    img {
      width: 2rem;
      height: 2rem;
      border-radius: 1rem;
      border: .2rem solid $white;
    }
  }
}

</style>
