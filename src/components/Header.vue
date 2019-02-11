<template>
  <a-nav
    :has-search="hasSearch"
    :items="getItems"
    logo="light"
    tag="Beta"
    type="dark"
    effect="dark"
    class="navbar"
    @search="onSearch"
    @brand-click="$router.push({ name: 'hub' })"
    @support="support"
    @signin="signin">
    <li
      v-click-outside="close"
      v-if="isUserLoggedIn"
      id="profile_dropdown"
      class="nav-item dropdown">
      <a
        :aria-expanded="toggled"
        href="#"
        class="nav-link profile"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        @click.stop="toggled = !toggled">
        <img
          :src="`https://avatars.githubusercontent.com/${getUser.username}?s=64`"
          alt="user" >
      </a>
      <transition name="navbar-dropdown">
        <div
          v-show="toggled"
          class="dropdown-menu dropdown-menu-right dark profile-drop"
          aria-labelledby="profile_dropdown">
          <a
            class="dropdown-item"
            href="#"
            title="Profile"
            @click.stop="$router.push({ name: 'organization', params: { owner: getUser.username } })">
            Profile
          </a>
          <a
            class="dropdown-item"
            href="#"
            title="Logout"
            @click.stop="logout">
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
  name: 'AHeader',
  data: () => ({ toggled: false }),
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
    logout: function () {
      this.$api.logout()
      this.toggled = false
    },
    signin: function (e) {
      this.$api.dummyUser()
      // this.$router.push({ name: 'hub' })
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
  // background-color: $dark;

  .profile {
    padding: .75rem 0;
    img {
      width: 2rem;
      height: 2rem;
      border-radius: 1rem;
      border: .2rem solid $white;
    }
  }

  .profile-drop {
    min-width: 100px;
  }
}

</style>
