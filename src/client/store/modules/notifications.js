/* eslint no-param-reassign: "off"*/
/* eslint no-unused-vars: "off"*/

// Initial state
export const state = {
  notifications: [],
};

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const mutations = {
  ADD_NOTIFICATION(globalStore, notification) {
    globalStore.notifications.push(notification);
  },
  REMOVE_NOTIFICATION(globalStore, notification) {
    globalStore.notifications.splice(notification, 1);
  },
};

export const actions = {
  notify({ dispatch, commit }, notification) {
    commit(ADD_NOTIFICATION, notification);
    const timeout = (notification.timeout === undefined) ? 10000 : notification.timeout;
    if (typeof timeout === 'number' && timeout > 0) {
      setTimeout(() => {
        commit(REMOVE_NOTIFICATION, notification);
      }, timeout);
    }
  },
};

export const store = {
  state,
  mutations,
  actions,
};

export function install(Vue, globalStore) {
  Vue.prototype.$notify = (message, timeout) => {
    globalStore.dispatch('notify', {
      type: 'notify',
      message,
      timeout,
    });
  };
  Vue.prototype.$error = (message, timeout) => {
    globalStore.dispatch('notify', {
      type: 'error',
      message,
      timeout,
    });
  };
  Vue.prototype.$warn = (message, timeout) => {
    globalStore.dispatch('notify', {
      type: 'warn',
      message,
      timeout,
    });
  };
  Vue.prototype.$success = (message, timeout) => {
    globalStore.dispatch('notify', {
      type: 'success',
      message,
      timeout,
    });
  };
}

export default { store, install };
