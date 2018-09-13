<template>
  <div id="hub">
    <a-cookie />
    <a-header @open-service-modal="openSubmitAServiceModal" @login="loginWait = true" />
    <transition name="view-fade" mode="out-in">
      <router-view @open-submit-service-modal="openSubmitAServiceModal"></router-view>
    </transition>
    <app-footer/>
    <submit-service-modal id="submit-service-modal" ref="submitAServiceModal" />
    <transition name="fade">
      <div class="login" v-show="loginWait">
        <a-card shadow>
          <h3 class="mb-20">{{ loginMessage }}</h3>
          <p>
            <font-awesome-icon icon="spinner" pulse />
          </p>
          <a-button v-show="loginCancelDisplay" type="neutral" @click="loginWait = false">Cancel login</a-button>
        </a-card>
      </div>
    </transition>
  </div>
</template>

<script>
import SubmitServiceModal from '@/components/SubmitAServiceModal'
import AHeader from '@/components/Header'

export default {
  name: 'app',
  data: () => ({
    loginWait: false,
    loginWindow: null,
    loginMessage: 'Waiting for your authentication',
    loginCancelDisplay: true
  }),
  components: {
    SubmitServiceModal,
    AHeader
  },
  watch: {
    loginWait: function (newValue) {
      if (newValue) {
        document.body.classList.add('modal-open')
        let dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
        let dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY

        let w = 600
        let h = 400
        let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
        let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

        let left = ((width / 2) - (w / 2)) + dualScreenLeft
        let top = ((height / 2) - (h / 2)) + dualScreenTop

        this.loginWindow = window.open('//login.asyncy.com/github?state=123', 'loginWindow', 'titlebar=1, toolbar=0, location=0, status=1, menubar=0, scrollbars=0, resizable=0, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)
        this.loginWindow.focus()
        const timer = setInterval(() => {
          if (this.loginWindow.closed) {
            clearInterval(timer)
            this.loginMessage = 'Fetching personal informations'
            this.loginCancelDisplay = false
            setTimeout(() => {
              this.loginWait = false
            }, 1000)
          }
        }, 1000)
      } else {
        document.body.classList.remove('modal-open')
        this.loginWindow = null
        this.loginMessage = 'Waiting for your authentication'
        this.loginCancelDisplay = true
      }
    }
  },
  methods: {
    openSubmitAServiceModal: function() {
      this.$refs.submitAServiceModal.show = true
    },
    closeSubmitAServiceModal: function() {
      this.$refs.submitAServiceModal.show = false
    }
  }
}
</script>

<style lang="scss">

.login {
  background-color: rgba(0,0,0,0.3);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  z-index: 2147483647;
}

@import "~bulma/sass/utilities/_all";
@import "~bulma/sass/grid/columns";
@import "~bulma/sass/grid/tiles";
@import "~bulma/sass/components/level";
@import "~bulma/sass/components/media";
@import "~bulma/sass/elements/tag";
@import "~bulma/sass/elements/table";
@import "~@/assets/loading-shimmer";

.table {
  border-spacing: 0px;
  border-collapse: collapse;
}

body {
  background: #111;
  margin: 0;
}

h1,
h2,
h3,
h4,
h5 {
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 0.5em;
}

h3,
h4,
h5 {
  font-weight: 500;
}

.no-padding {
  padding: 0 !important;
}

#hub {
  background: white;
  text-align: center;
  color: black;
  font-size: 1em;
  line-height: 1.6em;
}

a {
  color: #7a33d7;
  text-decoration: none;
}

.fade-enter-active {
  transition: opacity 0.3s;
}

.fade-leave-active {
  position: absolute;
}

.align-items-center {
  align-items: center;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.header-search-bar {
  margin-bottom: 0 !important;
}

#hub {
  .section {
    padding-top: 0;
    padding-bottom: 2em;
  }
}

.view-fade-enter-active,
.view-fade-leave-active {
  transition-duration: 0.1s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.view-fade-enter,
.view-fade-leave-active {
  opacity: 0
}

.left-image,
.right-image {
  z-index: -1 !important;
}

@import "~asyncy-ui-components/dist/css/global.css";
@import "~asyncy-ui-components/dist/AButton.css";
@import "~asyncy-ui-components/dist/AInput.css";
@import "~asyncy-ui-components/dist/AppFooter.css";
@import "~asyncy-ui-components/dist/AppHeader.css";
</style>
