<template lang="html">
  <div class="notifications" :data="notifications">
      <notification v-for="(notification, key) in notifications" :key="key" :notification="notification"></notification>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import notification from './notification.vue';

export default {
  components: {
    notification,
  },
  computed: mapState({
    notifications: state => state.notifications.notifications,
  }),
};
</script>
