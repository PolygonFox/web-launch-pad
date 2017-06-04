<template lang="html">
    <div>
        <notifications></notifications>
        <div class="row header">
          <div class="column medium-12">
            <h1>Web Launch Pad</h1>
            <nav class="navigation">
              <router-link v-show="isAuthenticated" :to="{ name: 'home' }">Home</router-link>
              <router-link v-show="!isAuthenticated" :to="{ name: 'auth.login' }">Login</router-link>
              <router-link v-show="!isAuthenticated" :to="{ name: 'auth.register' }">Register</router-link>
              <a v-show="isAuthenticated" href="#logout" @click.prevent="logout">Logout</a>
            </nav>
            </div>
        </div>
        <div class="row appcontainer">
          <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import notifications from '../partials/notify/notifications.vue';

export default {
  components: {
    notifications,
  },
  computed: mapState({
    isAuthenticated: state => state.authentication.authenticated,
  }),
  methods: {
    logout() {
      // Logout functionality
      this.$store.dispatch('logout');
    },
  },
};
</script>
