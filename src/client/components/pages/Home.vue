<template lang="html">
<div>
    <div class="column column-2">
      <ul>
        <li>Route name: {{ route.name }}</li>
        <li>Apollo Test Query: {{ apolloResult }}</li>
      </ul>
      <button class="button" @click="sendNotification">Add notification</button>
    </div>
    <div class="column column-10">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
</div>
</template>

<script>

import gql from 'graphql-tag';

export default {
  apollo: {
    apolloResult: gql`{
      apolloResult: hello
    }`,
  },

  methods: {
    sendNotification() {
      this.$success('Hello notification!');
    },
  },

  data() {
    return {
      apolloResult: 'Pending..',
    };
  },

  computed: {
    route() {
      return this.$store.state.route;
    },
  },

  watch: {
    route() {
    },
  },
};

</script>
