<template lang="html">
    <div>
        <div class="row header">
          <h1>Web Launch Pad</h1>
        </div>
        <div class="row appcontainer">
          <div class="column column-2">
            <ul>
              <li>Route name: {{ route.name }}</li>
              <li>Apollo Test Query: {{ apolloResult }}</li>
            </ul>
          </div>
          <div class="column column-10">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
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
