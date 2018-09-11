<template>
  <a-nav
    :logo="logo"
    :isBeta="true"
    effect="light"
    expand
    type="secondary"
    @title-click="$router.push({ name: 'hub' })">
    <div
      class="row"
      slot="content-header"
      slot-scope="{closeMenu}">
      <div class="col-6 collapse-brand">
        <router-link :to="{ name: 'hub' }">
          <img src="img/brand/blue.png">
        </router-link>
      </div>
      <div class="col-6 collapse-close">
        <close-button @click="closeMenu" />
      </div>
    </div>
    <div
      class="row"
      slot="content-header"
      slot-scope="{closeMenu}">
      <div class="col-6 collapse-brand">
        <router-link :to="{ name: 'hub' }">Asyncy</router-link>
      </div>
      <div class="col-6 collapse-close">
        <a-close-button target="nav-inner-primary" @click="closeMenu" />
      </div>
    </div>

    <transition name="fade">
      <template v-if="hasSearch">
        <div class="column align-center is-hidden-mobile search-container">
            <form
              class="header-form"
              @submit.prevent="onSearch">
              <a-input
                placeholder="Search"
                v-model="search"
                class="header-search-bar" />
            </form>
          </div>
        <div class="column is-hidden-mobile"></div>
      </template>
    </transition>

    <ul class="navbar-nav ml-lg-auto align-items-center">
      <li class="nav-item">
        <router-link to="/" class="nav-link nav-link-icon">Explore</router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Platform</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Documentation</a>
      </li>
      <li class="nav-item">
        <a-button
          outline
          type="primary"
          @click.native="$emit('open-service-modal')">Submit a Service</a-button>
      </li>
    </ul>
  </a-nav>
</template>

<script>
import logo from '@/assets/logo.svg'

export default {
  name: 'a-header',
  computed: {
    hasSearch: function () {
      return this.$route.meta.hasSearch
    }
  },
  data: () => ({
    search: '',
    logo
  }),
  methods: {
    onSearch: function () {
      this.$router.push({ name: 'search', query: { q: this.search } })
      this.search = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.search-container {
  padding: 0;
  margin-left: 50px;

  .header-search-bar {
    width: 250px;
    @media screen and (max-width: 990px) {
      width: 100%;
    }
  }

}
</style>
