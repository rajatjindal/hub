<template>
  <div class="home">
    <div class="has-background-light">
      <!-- <div class="container">
        <div class="columns is-centered">
          <div class="column is-10">
            <a-section
              absolute-header
              large-header
              body-padded>
              <template slot="header-left">
                <div class="logo-badge">
                  <a-logo icon />
                </div>
              </template>
              <template slot="header-centered">
                <table>
                  <tr>
                    <td class="has-text-right">
                      <span class="is-size-8 has-text-gray-2">From:</span>
                    </td>
                    <td>
                      <span class="is-size-8 has-text-gray-2 has-text-weight-bold">The Asyncy Crew {{ ':wave:' | emoji }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="has-text-right">
                      <span class="is-size-8 has-text-gray-2">To:</span>
                    </td>
                    <td>
                      <span class="is-size-8 has-text-gray-2 has-text-weight-bold">You ! {{ ':rocket:' | emoji }}</span>
                    </td>
                  </tr>
                </table>
              </template>
              <p class="has-text-dark">Dear Fellow Developer,<br><br>
                Welcome to the <b>developer marketplace</b>. All the services you discover here run in the <br>
                <b>Microservice Cloud</b> (an open-source platform built atop Kubernetes).<br>
                With <b>Storyscript, a service-oriented programming language</b> that strings services together, <br>
                you can focus on what matters most: your <b>business logic</b>. We call this the “the story of data”.<br><br>
                We have many use cases
                <a
                  href="//docs.asyncy.com/#use-cases"
                  title=""
                  class="has-text-info has-text-weight-bold">
                  here
                </a>
                and documentation on Storyscript
                <a
                  href="//storyscript.org"
                  title="Storyscript"
                  class="has-text-info has-text-weight-bold">
                  here
                </a>
                .<br><br>
                We hope you find our product inspiring, as we built it with passion for you, the developer.<br><br>
                With Love,<br>
                The Asyncy Crew<br><br>
              </p>
              <a-logo icon />
            </a-section>
          </div>
        </div>
      </div> -->
      <div class="container">
        <div class="columns">
          <div class="column is-full">
            <a-section absolute-header>
              <home-description-template
                v-for="(step, idx) of steps"
                :key="`step-${idx}`"
                :idx="idx"
                :name="step.name"
                :content="step.content"
                :link="step.link"
                :picture="step.picture"
                :picture2x="step.picture2x"
                :picture3x="step.picture3x"
              />
              <a-boxed class="has-text-centered">
                <p class="is-size-8 boxed-top-text">Every application has a story of how data moves</p>
                <h3 class="is-size-3 has-text-dark">Storytell your next feature with Asyncy.</h3>
              </a-boxed>
            </a-section>
          </div>
        </div>
      </div>
    </div>
    <div class="section has-background-dark">
      <div class="container is-constellation has-text-centered">
        <h4 class="is-size-4 has-text-weight-bold has-text-white has-text-uppercase">List your service on Asyncy Hub</h4>
        <a-button
          class="home-submit-btn"
          state="light"
        >
          Submit a service
        </a-button>
      </div>
    </div>
    <div class="container">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h2 class="is-size-4 has-text-gray-2 title">
              Find a service
            </h2>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <a-button
              :route="{ name: 'services' }"
              state="secondary"
              arrow
              size="small"
            >
              View More
            </a-button>
          </div>
        </div>
      </div>
      <transition-group
        name="fade"
        tag="div"
        class="columns is-multiline services-container">
        <div
          v-for="(r, index) in data.recentServices.slice(0, 6)"
          :key="r.alias || index"
          class="column is-one-third">
          <service-summary
            :title="getTitle(r)"
            :is-alias="r.alias ? true : false"
            :description="r.description"
            :tags="r.topics" />
        </div>
      </transition-group>
    </div>
    <div class="section has-background-light">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h2 class="is-size-4 has-text-gray-2 title">
                Community
              </h2>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <a-button
                url="//asyncy.com/blog"
                state="secondary"
                arrow
                size="small"
              >
                View More
              </a-button>
            </div>
          </div>
        </div>
        <transition-group
          name="fade"
          tag="div"
          class="columns articles-container">
          <div
            v-for="(r, index) in data.recentServices.slice(0, 3)"
            :key="r.alias || index"
            class="column is-one-third">
            <article-summary
              :title="getTitle(r)"
              :description="r.description" />
          </div>
        </transition-group>
      </div>
    </div>
    <a-join
      is-paddingless
      footer />
  </div>
</template>

<script>
import { IndexQuery } from '@/plugins/graphql'
import ServiceSummary from '@/components/ServiceSummary'
import ArticleSummary from '@/components/ArticleSummary'
import ASection from '@/components/ASection'
import HomeDescriptionTemplate from '@/components/templates/HomeDescription'
import Picture1 from '@/assets/img/home/1.png'
import Picture12x from '@/assets/img/home/1@2x.png'
import Picture13x from '@/assets/img/home/1@3x.png'
import Picture2 from '@/assets/img/home/2.png'
import Picture22x from '@/assets/img/home/2@2x.png'
import Picture23x from '@/assets/img/home/2@3x.png'
import Picture3 from '@/assets/img/home/3.png'
import Picture32x from '@/assets/img/home/3@2x.png'
import Picture33x from '@/assets/img/home/3@3x.png'
import Picture4 from '@/assets/img/home/4.png'
import Picture42x from '@/assets/img/home/4@2x.png'
import Picture43x from '@/assets/img/home/4@3x.png'

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
    ArticleSummary,
    HomeDescriptionTemplate,
    ASection
  },
  data: () => ({
    data: {
      recentServices: [{}, {}, {}, {}, {}, {}]
    },
    steps: [{
      name: 'Discover it.',
      content: 'Explore services written in any programming language. From microservices to functions, workflows and API\'s; it\'s all here.',
      link: { name: 'services' },
      picture: Picture1,
      picture2x: Picture12x,
      picture3x: Picture13x
    }, {
      name: 'Create it.',
      content: 'Develop your own unique services and functions in any programming language. Share it, sell it, or keep it secret.',
      link: { href: '//ayncy.com/blog' },
      picture: Picture2,
      picture2x: Picture22x,
      picture3x: Picture23x
    }, {
      name: 'Try it.',
      content: `Test services in a sandbox before putting it into production. AB test new microservices and workflows with ease.`,
      picture: Picture3,
      picture2x: Picture32x,
      picture3x: Picture33x
    }, {
      name: 'Launch it.',
      content: 'Write your application that combines many services, harmoniously. We call this microservice cheoreography.',
      link: { href: '//ayncy.com/blog' },
      picture: Picture4,
      picture2x: Picture42x,
      picture3x: Picture43x
    }]
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

<style lang="scss">
.boxed-top-text {
  color: nth($grays, 1);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottoM: .5rem;
}

.logo-badge {
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  border: 1px solid nth($grays, 4);
  background-color: $light;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 1.75rem;
    height: 1.75rem;
  }
}

.home {
  .container + .container,
  .container + .section,
  .section + .container {
    margin-top: 9.25rem;
  }

  .section {
    padding: 5rem 0;
  }

  .services-container,
  .articles-container {
    padding-top: 3.5rem;
  }

  .home-submit-btn {
    margin-top: 2rem;
    color: $primary !important;
  }
}
</style>
