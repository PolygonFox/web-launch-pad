<template lang="html">
  <div>
    <form action="#" @submit.prevent="login">
      <input type="text" placeholder="E-mail" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <input type="submit" class="button">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    login() {
      console.log(`Login! Username: ${this.email}, Password: ${this.password}`);
    },
  },
};
</script>

<style lang="css">
</style>
