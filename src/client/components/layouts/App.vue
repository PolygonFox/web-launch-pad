<template lang="html">
    <div>
        <h1>Web Launch Pad</h1>
        <ul>
          <li>Route name: {{ route.name }}</li>
          <li>Apollo Test Query: {{ apolloResult }}</li>
        </ul>
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
