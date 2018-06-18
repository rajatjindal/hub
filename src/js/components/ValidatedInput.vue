<template>
  <div>
      <input
        type="text"
        class='email-input'
        name='email'
        :placeholder="placeholder || 'Email address'"
        v-model="email"
        aria-label="Email"
        :style="Object.assign({
          width: '100%',
        }, inputStyle || {})"/>
      <div v-if="errorMsg" class='error-message' :style="{
        color: '#F74545',
        textAlign: 'left',
        fontSize: '0.8em',
      }">{{errorMsg}}</div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      errorMsg: '',
    };
  }
}
</script>

<style scoped lang="scss">
.email-form {
  &.error .email-input {
    border-color #F74545
  }
  &.success .email-input {
    border-color #3EC28F
  }
  &.success button {
    color #3EC28F !important
  }
}

</style>
