<template lang="html">
  <div>
    <h2>Whoops, we couldn't find '{{ pageSlug }}' :(</h2>
  </div>
</template>
<script>

export default {
  data() {
    return {
      pageSlug: this.$route.path,
    };
  },
};
</script>
