<template>
  <div :class="['has-background-light', {'section': ['service', 'guide'].includes($route.name)}]">
    <a-navbar
      v-if="['service', 'guide'].includes($route.name)"
      :items="menu"
      @click="$emit('open-modal')"
      @logo="$router.push({ name: 'home' })"
    />
    <a-jumbo
      v-else
      :size="current.size"
      :into="current.into"
      :small="current.small"
      :title="current.title"
      class="is-hub">
      <a-navbar
        slot="header"
        :items="menu"
        dark
        @click="$emit('open-modal')"
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
          <div class="column is-two-fifths">
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
  </div>
</template>

<script>
export default {
  name: 'Header',
  data: () => ({
    search: '',
    jumbos: [{
      name: 'home',
      size: 'large',
      title: 'Asyncy Hub',
      small: 'Unite Developers in One Storyline.'
    }, {
      name: 'services',
      size: 'medium',
      title: 'Asyncy Hub',
      small: 'Service Discovery and Marketplace'
    }, {
      name: 'functions',
      size: 'large',
      title: 'Coming soon',
      small: 'Functions'
    }, {
      name: 'apps',
      size: 'large',
      title: 'Coming soon',
      small: 'Applications'
    }, {
      name: 'faq',
      size: 'normal',
      title: 'Service submission',
      small: 'FAQ'
    }],
    visible: false
  }),
  computed: {
    menu: function () {
      return [
        { name: 'Services', route: { name: 'services' }, active: this.$route.name === 'services' },
        { name: 'Functions', route: { name: 'functions' }, active: this.$route.name === 'functions' },
        { name: 'Apps', route: { name: 'apps' }, active: this.$route.name === 'apps' },
        // { name: 'More', children: [{ name: 'contact' }] },
        { name: 'Submit a service', button: { rounded: false }, icon: 'pin' }
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
      this.$emit('search', { search: this.search, submit: false })
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
    background-color: darken($primary, 40%) !important;
    background: radial-gradient(ellipse at 50% 150%, darken($primary, 20%), darken($primary, 40%)) !important;
  }
  &, & > * {
    transition: all 0.3s ease-in-out;
  }

  .jumbo-p {
    margin-top: -2rem;
  }
}
</style>
