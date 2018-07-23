<template>
  <div class="darken-background">
    <div class="modal">
      <h2>Submit a Service</h2>
      <p>To submit a service, add this webhook to your Github repository:</p>
      <Code class="code">https://sync.asyncy.com/service/sync</Code>
      <p>To add a webhook, go to the settings page of your repository. From there, click Webhooks, then Add webhook. For more details, you can visit this <url-link to="/faq" @click.native="onClickDone()">documentation page →</url-link></p>
      <a-button color="white" @click.native="onClickDone">Done</a-button>
    </div>
  </div>
</template>

<script>
import Code from './Code';

export default {
  components: { Code },
  methods: {
    onClickDone() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="styl">
.darken-background
  z-index 1000
  position fixed
  top 0
  left 0
  width 100vw
  height 100vh
  background-color rgba(black 0.5)
  display flex
  align-items center
  justify-content center

.modal
  text-align left
  max-width 680px
  border-radius 4px
  padding 41px 53px
  margin 10px
  background-color white

.code
  color #111
  font-size 1.3em
  border 1px solid #DCDCDC
  margin-bottom 1em
  border-radius 5px
  background-color #F8F8F8

h2
  font-weight 500
  margin-bottom 1em

p
  margin-bottom 1em

a
  font-weight 500
  &:hover
    text-decoration underline
</style>
