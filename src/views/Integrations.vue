<template>
  <div class="index">
    <div class="hero">
      <transition name="fade">
        <h1 class="display-1">Integrations</h1>
      </transition>
    </div>
    <div class="columns">
      <div class="column">
        <div class="body-section">
          <div class="columns">
            <div class="column is-one-quarter">
              <a-card shadow>
                <div slot="header"><h5 class="heading-title text-primary mb-0">Twitter</h5></div>
                  <p>Learn how to integrate the twitter service easily and fastly</p>
                <div slot="footer">
                  <a-button outline type="primary" @click="$router.push({ name: 'integration', params: { repo: 'twitter' } })">Read <font-awesome-icon icon="arrow-right" /></a-button>
                </div>
              </a-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Integrations'
}
</script>

<style lang="scss" scoped>

.index {
  background-color: #fff;
}

.hero {
  position: relative;
  overflow: hidden;
  padding: 4em 5em;
  background: #eeeeee;
  z-index: 1;
}

.index {
  min-height: 650px;
  margin-top: 1.5em;
}

.columns {
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
}
</style>
