<template>
  <div class="index">
    <div class="body">
      <div class="level back">
        <div class="level-left is-mobile">
          <router-link to="/" class="level-item"><div class="back-icon"><img :src="leftCaret"/></div>Back to Hub</router-link>
        </div>
      </div>

      <h1>About Asyncy Hub</h1>
      <p class="p">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.
      </p>

      <p class="p">
        Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.
      </p>

      <div class="links">
        <h2 class="title">Resources</h2>
        <ul>
          <li><a href="/">Link 1</a></li>
          <li><a href="/">Link 1</a></li>
          <li><a href="/">Link 1</a></li>
        </ul>
      </div>

      <div class="links">
        <h2 class="title">Furthur Reading</h2>
        <ul>
          <li><a href="/">Link 1</a></li>
          <li><a href="/">Link 1</a></li>
          <li><a href="/">Link 1</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import leftCaret from '@/assets/left_caret.svg'

export default {
  data: () => ({
    leftCaret
  })
}
</script>

<style scoped lang="scss">
.body {
  max-width: 700px;
  padding: 25px;
  text-align: left;
  margin: 25px auto;
}

.back {
  margin-bottom: 2em;

  a {
    color: #707073;
  }

  .back-icon {
    height: 30px;
    width: 30px;
    border-radius: 5px;
    background-color: #ececec;
    display: inline-flex;
    justify-content: center;
    margin-right: 0.5em;
  }
}

h1 {
  margin-bottom: 1em;
}

.p {
  line-height: 1.9em;
}

.links {
  padding-top: 2em;

  .title {
    font-size: 1em;
    font-weight: 500;
  }

  ul {
    padding-left: 0;
    list-style: none;

    li {
      line-height: 2.1em;

      a:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
