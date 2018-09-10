<template>
  <div>
    <div class="container">
      <h1>404</h1>
      <h2>Oops. The page you were looking for doesn't exist.</h2>
      <p>You may have mistyped the address or the page may have moved</p>

      <router-link to='/'><a-button color="white">Go to homepage</a-button></router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  background-color: white;
  text-align: center;
  padding: 6em 25px;

  & h1 {
    font-size: 2.7em;
  }

  & h2 {
    margin-bottom: 0.8em;
  }

  & p {
    font-size: 1.1em;
    margin-bottom: 1em;
  }
}
</style>
