<template lang="html">
  <div>
    <form action="#" @submit.prevent="login">
      <input type="text" placeholder="E-mail" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <input type="submit" value="Login" class="button">
    </form>
  </div>
</template>

<script>

import settings from '../../../../settings';

export default {

  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      const data = {
        email: this.email,
        password: this.password,
      };
      this.$http.post(`${settings.api}/login`, data).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>

<style lang="css">
</style>
