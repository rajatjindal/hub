<template>
  <a-modal :show.sync="show" id="submit-service-modal">
    <h6 slot="header" class="modal-title" id="modal-title-notification">Submit a service</h6>
    <div class="py-3 text-center">
      <!-- <i class="fa fa-code-branch fa-3x"></i> -->
      <font-awesome-icon icon="code-branch" size="3x" />
      <p>To submit a service, add this webhook to your Github repository:</p>
      <Code id="modal-code" class="code">https://sync.asyncy.com/service/sync</Code>
      <p>To add a webhook, go to the settings page of your repository. From there, click Webhooks, then Add webhook. For more details, you can visit this <url-link to="/faq" @click.native="show = false">documentation page →</url-link></p>
    </div>
    <template slot="footer">
      <a-button type="link" class="ml-auto" @click="show = false">Done</a-button>
    </template>
  </a-modal>
</template>

<script>
import Code from './Code'

export default {
  components: { Code },
  data: () => ({
    show: false
  })
}
</script>

<style lang="scss">
#submit-service-modal {
  .modal-body {
    div {
      p {
        margin-top: 20px;
      }

      #modal-code {
        .clippy-btn {
          top: 15px;

          .clippy {
            top: -2px;
          }
        }
      }
    }
  }
}
</style>
