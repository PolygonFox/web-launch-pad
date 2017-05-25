<template lang="html">
    <div>
        <h1>Test, route name: {{ route.name }}</h1>
    </div>
</template>

<script>
export default {
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
