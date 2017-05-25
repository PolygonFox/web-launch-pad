<template lang="html">
    <div>
        <h1>Test!!</h1>
    </div>
</template>

<script>

export default {
  mounted() {
  },

  watch: {
    $route: (to, from) => {
      console.log(from);
    },
  },
};

</script>
