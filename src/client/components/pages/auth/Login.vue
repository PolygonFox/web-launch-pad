<template lang="html">
  <div>
    <form action="#" @submit.prevent="login">
      <label v-for="error in errors">{{ error }}</label>
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
      errors: [],
    };
  },
  methods: {
    login() {
      const data = {
        email: this.email,
        password: this.password,
      };
      this.$http.post(`${settings.api}/authenticate`, data).then((response) => {
        if (response.data.success) {
          console.log(response.data);
          this.$success('You logged in!');
        } else {
          this.errors = response.data.errors;
        }
      }).catch(() => {
        //
      });
    },
  },
};
</script>

<style lang="css">
</style>
