<template>
  <div class="container">
    <h1>How do I submit a service?</h1>
    <p class="subtitle">A step-by-step guide to adding the Asyncy webhook to your repository in Github.</p>

    <div class="step">
      <p>1. Navigate to your repository in Github, and go to the <span class="highlight">Settings</span>.</p>

      <img :src="faq1" />
    </div>

    <div class="step">
      <p>2. Under settings, navigate to the <span class="highlight">Webhooks</span> section in the left nav bar. Click <span class="highlight">Add Webhook</span>.</p>

      <img :src="faq2" />
    </div>

    <div class="step">
      <p>3. Put <code>https://sync.asyncy.com/service/sync</code> as the payload URL. Set the Content type to <code>application/json</code>. Leave everything else as the default. Click <span class="highlight">Add Webhook</span> at the bottom of the page.</p>

      <img :src="faq3" />
    </div>

    <div class="step">
      <p>4. You're done!</p>
      <url-link to="/"><a-button class="final-button" color="white">Return to homepage</a-button></url-link>
    </div>
  </div>
</template>

<script>
import faq1 from '@/assets/faq/faq_1.jpg'
import faq2 from '@/assets/faq/faq_2.jpg'
import faq3 from '@/assets/faq/faq_3.jpg'

export default {
  name: 'faq',
  data: () => ({
    faq1,
    faq2,
    faq3
  })
}
</script>

<style scoped lang="scss">
h1 {
  line-height: 3.2rem;
}

.container {
  margin: 75px auto;
  padding: 25px;
  max-width: 900px;
  text-align: left;
}

.subtitle {
  font-size: 1.3em;
  color: #555;
}

.highlight {
  font-weight: 500;
}

.step {
  margin-top: 75px;

  p {
    font-size: 1.2em;
    margin-bottom: 1.8em;
  }

  code {
    font-size: 1.2em;
  }

  img {
    max-width: 800px;
  }
}

// .final-button {
//   font-size: 1.4rem !important;
// }
</style>
