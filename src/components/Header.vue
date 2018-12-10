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
    @signup="signup"
    @signin="signin"
    :items="[{
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
          name: 'Community'
        }, {
          name: 'Support'
        }]
      }, {
        name: 'Signin with Github',
        button: 'primary',
        emit: 'signin'
      }]" />
</template>

<script>
export default {
  name: 'a-header',
  computed: {
    hasSearch: function () {
      return this.$route.meta.hasSearch
    }
  },
  methods: {
    onSearch: function (q) {
      this.$router.push({ name: 'search', query: { q } })
    },
    signup: function (e) {
      console.log('signup clicked', e)
    },
    signin: function (e) {
      this.$router.push({ name: 'dashboard' })
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
}

</style>
