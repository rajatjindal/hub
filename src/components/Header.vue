<template>
  <a-jumbo
    :size="current.size"
    :into="current.into"
    :small="current.small"
    :title="current.title"
    class="is-hub">
    <a-navbar
      slot="header"
      :items="menu"
      dark
      @logo="$router.push({ name: 'home' })"
    />
    <template v-if="current.name === 'home'">
      <p class="is-size-6 has-text-centered has-text-light jumbo-p">Explore, share and create reusable software, together.</p>
    </template>
    <template v-else-if="current.name === 'loading'">
      <template slot="title">
        <i class="mdi mdi-spin mdi-loading" />
      </template>
    </template>
    <template v-else-if="current.name === 'services'">
      <div class="columns is-centered">
        <div class="column is-one-third">
          <a-input
            icon-right="magnify"
            placeholder="SEARCH ON HUB" />
        </div>
      </div>
    </template>
  </a-jumbo>
</template>

<script>
export default {
  name: 'Header',
  data: () => ({
    jumbos: [{
      name: 'home',
      size: 'medium',
      title: 'Asyncy Hub',
      small: 'Unite Developers in One Storyline.'
    }, {
      name: 'apps',
      size: 'medium',
      title: 'Asyncy Hub',
      small: 'Applications'
    }, {
      name: 'services',
      size: 'medium',
      title: 'Asyncy Hub',
      small: 'Service Discovery and Marketplace'
    }, {
      name: 'functions',
      size: 'medium',
      title: 'Asyncy Hub',
      small: 'Functions'
    }],
    visible: false
  }),
  computed: {
    menu: function () {
      return [
        { name: 'Services', route: { name: 'services' }, active: this.$route.name === 'services' },
        { name: 'Functions', route: { name: 'functions' }, active: this.$route.name === 'functions' },
        { name: 'Apps', route: { name: 'apps' }, active: this.$route.name === 'apps' },
        { name: 'More', children: [{ name: 'contact' }] },
        { name: 'Sign up', button: {}, icon: 'account-circle' }
      ]
    },
    current: function () {
      return (
        !this.visible
          ? { name: 'loading', size: 'fullheight' }
          : this.jumbos.filter(j => j.name === this.$route.name)[0] ||
            {
              name: 'not-found',
              size: 'fullheight',
              title: '404',
              small: 'Lost in space ?',
              into: 'chevron'
            }
      )
    }
  },
  watch: {
    '$route': function () {
      this.visible = true
    }
  },
  mounted: function () {
    if (this.$route.name) {
      this.visible = true
    }
  }
}
</script>

<style lang="scss">
.jumbo {
  &.is-hub {
    background-image: url('~@/assets/img/bg/header-bg.jpg') !important;
    @media only screen and (min-device-pixel-ratio: 2) {
      background-image: url('~@/assets/img/bg/header-bg@2x.jpg') !important;
    }
    @media only screen and (min-device-pixel-ratio: 3) {
      background-image: url('~@/assets/img/bg/header-bg@3x.jpg') !important;
    }
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
  }
  &, & > * {
    transition: all 0.3s ease-in-out;
  }

  .jumbo-p {
    margin-top: -2rem;
  }
}
</style>
