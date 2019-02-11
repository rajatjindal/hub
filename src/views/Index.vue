<template>
  <div class="index">
    <section class="hero bg--dark is-large">
      <div class="hero-body">
        <div class="container text--center fixed">
          <stars-particles />
          <h1 class="title is-1 text--light">Asyncy Hub</h1>
          <h2 class="subtitle is-4 text--light">Discover awesome services and functions that will help you build awesome apps</h2>
        </div>
      </div>
    </section>
    <div class="video-section bg--dark">
      <div class="video">
        <font-awesome-icon icon="play" />
      </div>
    </div>
    <section class="section steps">
      <div class="container">
        <div class="columns">
          <div class="column is-half">
            <span class="badge dot">1</span>
            <h2>Find a service</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto placeat ipsa, neque assumenda asperiores eius deserunt atque, repellendus mollitia voluptatibus ea. Voluptatum asperiores amet, recusandae minima suscipit dolores deserunt cupiditate.</p>
            <a-button state="primary">Get a service <font-awesome-icon icon="arrow-right" /></a-button>
          </div>
          <div class="column is-half">
            <div class="placeholder bg--dark" />
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="placeholder bg--dark" />
          </div>
          <div class="column is-half">
            <span class="badge dot">2</span>
            <h2>Find a service</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto placeat ipsa, neque assumenda asperiores eius deserunt atque, repellendus mollitia voluptatibus ea. Voluptatum asperiores amet, recusandae minima suscipit dolores deserunt cupiditate.</p>
            <a-button state="primary">Get a service <font-awesome-icon icon="arrow-right" /></a-button>
          </div>
        </div>
        <div class="columns">
          <div class="column is-half">
            <span class="badge dot">3</span>
            <h2>Find a service</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto placeat ipsa, neque assumenda asperiores eius deserunt atque, repellendus mollitia voluptatibus ea. Voluptatum asperiores amet, recusandae minima suscipit dolores deserunt cupiditate.</p>
            <a-button state="primary">Get a service <font-awesome-icon icon="arrow-right" /></a-button>
          </div>
          <div class="column is-half">
            <div class="placeholder bg--dark" />
          </div>
        </div>
      </div>
    </section>
    <section class="section bg--light">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half text--center">
            <h2 class="title is-2">List your service on Asyncy Hub</h2>
            <a-button
              state="primary"
              size="l">Submit a Service</a-button>
          </div>
        </div>
      </div>
    </section>
    <section class="section preview">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <h2 class="title head-link is-3">
              Featured Services
              <a-link
                state="primary"
                class="link"
                @click.stop="$router.push({ name: 'services' })">View all <font-awesome-icon icon="arrow-right" /></a-link>
            </h2>
            <transition-group
              name="fade"
              tag="div"
              class="tile is-parent is-vertical">
              <div
                v-for="(r, index) in data.recentServices.slice(0, 3)"
                :key="r.alias || index"
                class="tile is-child">
                <service-summary
                  :title="getTitle(r)"
                  :is-alias="r.alias ? true : false"
                  :description="r.description"
                  :tags="r.topics"/>
              </div>
            </transition-group>
            <p class="helper">Want to see your service in our marketplace ?</p>
            <a-link state="primary">Submit your service <font-awesome-icon icon="arrow-right" /></a-link>
          </div>
          <div class="column is-half">
            <h2 class="title head-link is-3">
              Community
              <a-link
                state="primary"
                class="link">Visit <font-awesome-icon icon="arrow-right" /></a-link>
            </h2>
            <transition-group
              name="fade"
              tag="div"
              class="tile is-parent is-vertical">
              <div
                v-for="(r, index) in data.recentServices.slice(0, 3)"
                :key="r.alias || index"
                class="tile is-child">
                <article-summary
                  :title="getTitle(r)"
                  :description="r.description" />
              </div>
            </transition-group>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { IndexQuery } from '@/plugins/graphql'
import ServiceSummary from '@/components/ServiceSummary'
import ArticleSummary from '@/components/ArticleSummary'

export default {
  name: 'Index',
  apollo: {
    data: {
      query: IndexQuery,
      update: data => ({
        recentServices: data.recentlyAddedServices.nodes
      })
    }
  },
  components: {
    ServiceSummary,
    ArticleSummary
  },
  data: () => ({
    data: {
      recentServices: [{}, {}, {}, {}, {}, {}]
    }
  }),
  computed: {
    topics: function () {
      return this.data.recentServices.map(s => s.topics)
    }
  },
  methods: {
    getTitle: function (r) {
      if (!r.alias && (!r.organization || !r.organization.username)) {
        return ''
      }
      return r.alias || `${r.organization.username}/${r.name}`
    }
  }
}
</script>

<style scoped lang="scss">
svg {
  align-items: center;
}

.helper {
  margin: .5rem 0;
}

.section {
  border-bottom: none !important;
}
.head-link {
  align-items: center;
  display: flex;
  justify-content: space-between;
  .link {
    svg {
      margin-left: .5rem;
    }
  }
}

.section {
  &.preview {
    .container {
      .columns {
        .column {
          padding: 0 3rem;
          & + .column {
            border-left: 1px solid rgba($dark, 0.125);
          }
        }
      }
    }
  }
}

.section.steps {
  border-bottom: none;
  position: relative;
  .container {
    &:before {
      @include touch { display: none }
      content: '';
      width: 100%;
      height: 100%;
      background-image: url('~@/assets/curvedline.svg');
      background-repeat: no-repeat;
      background-size: 80% 85%;
      background-position: top left;
      position: absolute;
      top: 0;
    }
  }
  .columns {
    position: relative;
    margin-top: 2rem;
    & + .columns {
      margin-top: 15rem;
    }
    .column {
      p {
        margin-bottom: 1rem;
      }
    }
  }
}

.placeholder {
  width: 85%;
  height: 17rem;
  border-radius: .5rem;
  margin: 0 auto;
}

.badge {
  &.dot {
    background: linear-gradient(180deg, darken($primary, 0%), lighten($primary, 10%)) repeat-x;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $white;
    font-weight: bold;
  }
}

.video-section {
  position: relative;
  min-height: 0;
  padding: 0 !important;
  z-index: 1;
  margin-bottom: calc(150px + 2rem);
  .video {
    width: 800px;
    height: 300px;
    border-radius: .75rem;
    position: absolute;
    left: calc(50% - 400px);
    top: -150px;
    margin: 0;
    box-shadow: 0 0 2.25rem .5rem rgba(darken($dark, 15%), .5);
    background-color: darken($primary, 10%);
    align-items: center;
    justify-content: center;
    display: flex;
    svg {
      cursor: pointer;
      transition: all 0.1s ease-in-out;
      font-size: 4rem;
      position: relative;
      color: $white;
      &:hover {
        font-size: 7rem;
      }
    }
  }
}

.subtitle {
  display: block;
  font-size: 1.15em;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}

.help-message {
  font-size: 0.9em;
  color: #aaa;
}

ul {
  list-style: none;
  padding-left: 0;
  line-height: 2em;
}

.index {
  background-color: #fff;
}

.section {
  margin-bottom: 0;
  padding-top: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #ccc;

  .section-header {
    margin-bottom: 1.4em;
  }
}

.hero {
  position: relative;
  overflow: hidden;
  // padding: 4em 5em;
  // background: #eeeeee;
  z-index: 1;

  .search-bar-container {
    max-width: 580px;
    margin: 0 auto;
  }
}

.call-to-action {
  font-size: 1.9em;
  line-height: 1.4em;
  margin-bottom: 0.8em;
}

.featured-services {
  .featured {
    height: 150px;
    border-radius: 5px;
    padding: 25px;
    font-size: 0.9;
    font-weight: 600;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.05, 1.05);
    }
  }

  .slack-service {
    background-color: #78d4b6;
  }

  .twitter-service {
    background-color: #1da1f2;
  }

  .twilio-service {
    background-color: #f22f44;
  }

  a {
    width: 100%;
  }
}

.getting-started {
  text-align: center;
}
</style>
