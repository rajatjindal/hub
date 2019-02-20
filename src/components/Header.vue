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
            v-model="search"
            :icon-right="['a-icon', {icon: 'search'}]"
            placeholder="SEARCH ON HUB"
            @keyup.enter.native="$emit('search', { search, submit: true })"
          />
        </div>
      </div>
    </template>
  </a-jumbo>
</template>

<script>
export default {
  name: 'Header',
  data: () => ({
    search: '',
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
      this.search = this.$route.query.search || ''
    },
    'search': function () {
      this.$emit('search', { search: this.search, submit: this.search.trim().length === 0 })
    }
  },
  mounted: function () {
    this.search = this.$route.query.search || ''
    if (this.$route.name) {
      this.visible = true
    }
  }
}
</script>

<style lang="scss">
.jumbo {
  &.is-hub {
    background-color: #150D44 !important;
    background: radial-gradient(ellipse at center bottom, rgba(39,25,127,1), rgba(21,13,68,1)) !important;
    // background-image: none !important;
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
