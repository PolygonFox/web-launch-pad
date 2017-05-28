<template lang="html">
<transition name="fade">
  <div :class="['notification', notification.type]">{{ notification.message }}</div>
</transition>
</template>

<script>
export default {
  props: [
    'id',
    'notification',
  ],
};
</script>
