<template>
  <div
    v-scroll-spy="{ offset: 50 }"
    class="service-container"
  >
    <section id="readme">
      <h3 class="is-size-5 has-text-dark title has-text-uppercase">Description</h3>
      <div
        ref="readmeContainer"
        :class="{ full: showMore, 'loading-shimmer': !serviceName() }"
        class="readme-container card-bordered">
        <div
          v-if="!serviceName()"
          class="readme-md">
          <h5 class="is-size-5 has-text-centered has-text-gray-2">Loading content</h5>
        </div>
        <div
          v-if="tags() && tags().length > 0 && tags()[0].readme === false"
          class="readme-md">
          <h5 class="is-size-5 has-text-centered has-text-gray-4">No Readme file found for this microservice</h5>
        </div>
        <vue-markdown
          v-else-if="tags() && tags().length > 0 && tags()[0].readme"
          class="readme-md">{{ tags()[0].readme }}</vue-markdown>
        <div
          v-if="serviceName() && !showMore"
          class="readme-more">
          <a-button
            link
            @click="showMore = true">Show more</a-button>
        </div>
      </div>
    </section>
    <section id="actions">
      <div class="card-bordered">
        <div class="card-bordered-header">
          <h3 class="is-size-6 has-text-dark title has-text-uppercase">Actions</h3>
        </div>
        <transition name="fade">
          <div
            v-if="serviceName() && numCommands() <= 0"
            class="columns is-centered"
          >
            <h5
              class="has-text-centered has-text-gray-2 is-size-7 is-variable is-3">
              This service has no actions.
            </h5>
          </div>
        </transition>
        <template v-if="!serviceName()">
          <div
            v-for="i in 4"
            :key="i"
            class="columns is-vcentered is-mobile">
            <div class="column is-one-quarter">
              <div class="columns is-paddingless is-variable is-1 is-vcentered is-mobile">
                <div class="column">
                  <span class="tag is-secondary is-medium loading-shimmer" />
                </div>
                <div class="column">
                  <div class="is-divider" />
                </div>
              </div>
            </div>
            <div class="column loading-shimmer" />
            <div class="column">
              <a-button
                arrow
                size="small"
                state="light is-circle"
                disabled
              >
                Try now
              </a-button>
            </div>
          </div>
        </template>
        <template v-else>
          <div
            v-for="(command, name) in getFirstCommands"
            :key="name"
            class="columns is-vcentered is-variable is-2 is-mobile">
            <div class="column is-one-quarter">
              <div class="columns is-paddingless is-variable is-1 is-vcentered is-mobile">
                <div class="column is-narrow">
                  <span class="tag is-secondary is-medium">
                    {{ name }}
                  </span>
                </div>
                <div class="column">
                  <div class="is-divider" />
                </div>
              </div>
            </div>
            <div class="column is-half">
              <p :class="['is-text-ellipsed', {'has-text-gray-4': !command.help }]">
                {{ command.help || '« No description »' }}
              </p>
            </div>
            <div class="column is-one-quarter">
              <a-button
                arrow
                size="small"
                state="light is-circle"
                @click="$router.push({ path: `${$route.path}/guide`, hash: `#${name}` })"
              >
                Try now
              </a-button>
            </div>
          </div>
        </template>
        <div
          v-if="serviceName() && numCommands() > 0"
          class="card-bordered-footer has-text-centered"
        >
          <a-button
            link
            @click="$router.push({ path: `${$route.path}/guide`, hash: `#${Object.keys(commands())[0]}` })"
          >
            More
          </a-button>
        </div>
      </div>
    </section>
    <!-- <div class="body-section">
      <h3 class="heading-title title is-3 text-dark" id="similars">Similar apps</h3>
      <div class="columns">
        <div class="column is-one-third">
          <a-card>
            <h3>Twitter API</h3>
            <a-button state="link"><font-awesome-icon :icon="['fab', 'github']" /> Github repo</a-button>
            <a-button state="link"><a-logo icon /> Asyncy App</a-button>
          </a-card>
        </div>
        <div class="column is-one-third">
          <a-card>
            <h3>Twitter Bot</h3>
            <a-button state="link"><font-awesome-icon :icon="['fab', 'github']" /> Github repo</a-button>
            <a-button state="link"><a-logo icon /> Asyncy App</a-button>
          </a-card>
        </div>
      </div>
    </div> -->
    <section id="versions">
      <h3 class="is-size-5 has-text-dark title has-text-uppercase">Versions</h3>
      <div class="card-bordered">
        <template v-for="(tag, idx) of tags()">
          <template v-if="tag.configuration && tag.configuration.info && tag.configuration.info.version">
            <div
              :key="`version-${tag.state}`"
              class="columns is-mobile is-multiline is-vcentered"
            >
              <div class="column is-half">
                <h5 class="is-size-7 has-text-dark has-text-uppercase title">{{ tag.configuration.info.version }}</h5>
              </div>
              <div
                class="column is-half has-text-right">
                <span class="tag is-secondary is-warning">{{ tag.tag }}</span>
              </div>
              <div class="column">
                <p>{{ tag.changelog || 'No logs provided' }}</p>
              </div>
            </div>
          </template>
          <div
            v-else
            :key="`version-no-tag-${idx}`"
            class="columns is-mobile is-vcentered"
          >
            <div class="column">
              <h5 class="is-size-7 has-text-dark has-text-uppercase title">UNKNOWN</h5>
            </div>
            <div
              class="column has-text-right">
              <span class="tag is-secondary is-warning">{{ tags()[0].tag }}</span>
            </div>
          </div>
        </template>
      </div>
    </section>
    <section id="pricing">
      <h3 class="is-size-5 has-text-dark title has-text-uppercase">Pricing</h3>
      <!-- <h5 class="is-size-6 has-text-gray-2 subtitle">Select a plan to get started with {{ serviceName() }}</h5> -->
      <div class="image">
        <img
          src="@/assets/img/services/pricing.png"
          srcset="@/assets/img/services/pricing@2x.png 2x, @/assets/img/services/pricing@3x.png 3x"
          alt="pricing">
        <figcaption class="overlay-space-evenly">
          <h5 class="is-size-7 has-text-dark has-text-weight-bold has-text-uppercase">Coming Soon!</h5>
          <a-button url="//asyncy.com/blog">Read our Blog</a-button>
        </figcaption>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ServiceHome',
  data: () => ({ showMore: true }),
  inject: ['commands', 'tags', 'serviceName', 'numCommands', 'alias', 'owner', 'repo', 'onReady'],
  computed: {
    getFirstCommands: function () {
      const keys = Object.keys(this.commands())
      if (keys.length > 0) {
        let ret = {}
        for (let i = 0; i < 4 && i < keys.length; i++) {
          ret = { ...ret, [keys[i]]: this.commands()[keys[i]] }
        }
        return ret
      }
      return {}
    },
    readme: function () {
      return this.tags() && this.tags().length > 0 ? this.tags()[0].readme : undefined
    }
  },
  watch: {
    'readme': {
      deep: true,
      handler: function (value) {
        if (this.tags().length > 0 && this.tags()[0].readme) {
          /* global Prism */
          this.$nextTick(Prism.highlightAll)
          this.$nextTick(() => {
            this.showMore = (this.$refs.readmeContainer.clientHeight < 300)
          })
        }
      }
    }
  },
  mounted: function () {
    this.$nextTick(Prism.highlightAll)
    this.$nextTick(() => {
      this.showMore = (this.$refs.readmeContainer.clientHeight < 300)
    })
  }
}
</script>

<style lang="scss">
.readme-md {
  padding: 1rem 1.2rem;
  max-width: 100%;
  overflow: hidden;
  @include desktop {
    border-left: .5rem solid gray(200);
  }
  pre {
    overflow: auto;
    @include touch {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    code {
      @include touch {
        tab-size: 2;
        white-space: pre-wrap;
        word-wrap: break-word;
        text-align: justify;
      }
    }
  }

  h1 { font-size: nth($sizes, 4); }
  h2 { font-size: nth($sizes, 5); font-weight: 600; }
  h3 { font-size: nth($sizes, 6); font-weight: 600; }
  h4 { font-size: nth($sizes, 7); font-weight: 600; }
}

.readme-container {
  max-height: 300px;
  overflow: hidden;
  position: relative;
  &.full {
    max-height: unset;
  }
  .readme-more {
    background: linear-gradient(180deg, rgba(255,255,255,0) 0%,rgba(255,255,255,0.5) 10%,rgba(255,255,255,1) 100%);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 150px;
  }
}

.card-bordered {
  border: 1px solid nth($grays, 4);
  border-radius: .4rem;
  .columns {
    padding: 1.2rem;
  }
  .card-bordered-header {
    padding: 1rem 0;
    border-bottom: 1px solid nth($grays, 4);
  }
  .card-bordered-footer {
    border-top: 1px solid nth($grays, 4);
  }
}

.service-container {
  section + section {
    margin-top: 3rem;
  }
  section {
    h3.title {
      padding: 0 1.2rem;
    }
  }
}

.tag.is-secondary {
  background-color: #eeeeff;
  color: $primary;
  border-radius: .625rem;
  font-size: nth($sizes, 6);
  font-weight: 600;
  cursor: default;
}

.button {
  &.is-circle {
    &.is-light {
      color: $primary;
    }
    position: relative;
    float: right;
    transition: all .125s ease-in;
    padding-left: .45rem;
    padding-right: .45rem;
    margin-left: auto;
    span {
      transition: all .125s ease-in;
      max-width: 0;
      opacity: 0;
    }
    svg.arrow {
      margin-left: 0;
    }
    &:hover {
      margin-left: 0;
      span {
        margin-right: 2rem;
        max-width: 3rem;
        opacity: 1;
      }
    }
  }
}

.is-text-ellipsed {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
