<template lang="html">
  <div class="column medium-4">
    <form action="#" @submit.prevent="register">
      <label v-for="error in errors">{{ error }}</label>
      <input type="text" placeholder="E-mail" v-model="email" autocomplete="off">
      <input type="password" placeholder="Password" v-model="password" autocomplete="off">
      <input type="password" placeholder="Confirm password" v-model="confirmed_password" autocomplete="off">
      <input type="submit" value="Register" class="button">
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
      confirmed_password: '',
      errors: [],
    };
  },
  methods: {
    register() {
      this.errors = [];
      const data = {
        email: this.email,
        password: this.password,
        confirmed_password: this.confirmed_password,
      };
      this.$http.post(`${settings.api}/register`, data).then((response) => {
        if (response.data.success) {
          this.$router.push({ name: 'auth.login' });
          this.$success('Registration successful! You can now login.');
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
