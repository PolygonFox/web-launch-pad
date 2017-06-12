<template lang="html">
  <div class="column medium-12">
    <div class="row">
      <div class="column medium-12">
        <h2>Welcome! {{ user.email }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <ul>
          <li>Route name: {{ route.name }}</li>
          <li>Apollo Test Query: {{ apolloResult }}</li>
          <li>Token expiration timestamp: {{ user.exp }}</li>
        </ul>
        <button class="button" @click="sendNotification">Add notification</button>
      </div>
      <div class="column">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <h2>Add a new ship</h2>
        <form @submit.prevent="addShip">
          <input type="text" name="name" placeholder="Name" v-model="shipName">
          <input class="button" type="submit" value="Add" />
        </form>
      </div>
      <div class="column">
        <h2>All Ships</h2>
          <ul>
            <li v-for="ship in ships">{{ ship.name }}</li>
          </ul>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <h2>Foundation test</h2>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <form>
          <textarea v-model="editor1"></textarea>
        </form>
      </div>
      <div class="column">
        <form>
          <textarea v-model="editor2"></textarea>
        </form>
      </div>
    </div>

      <div class="row equalize" data-equalizer>
        <div class="column">
          <div v-html="editor1" style="border: 1px solid black;" data-equalizer-watch></div>
        </div>
        <div class="column">
          <div v-html="editor2" style="border: 1px solid black;" data-equalizer-watch></div>
        </div>
      </div>

  </div>
</template>

<script>

import gql from 'graphql-tag';
import decodeJWT from 'jwt-decode';
import { mapState } from 'vuex';

export default {
  apollo: {
    apolloResult: gql`{
        apolloResult: test
    }`,
    ships: gql`{
        ships {
          name
          strength
        }
      }
    `,
  },
  methods: {
    sendNotification() {
      this.$success('Hello notification!');
    },
    addShip() {
      this.$apollo.mutate({
        mutation: gql`mutation{
          createShip(params:{
            name: $name
          }) {
            name,
            strength
          }
        }`,
        variables: {
          name: this.shipName,
        },

        updateQueries: {
          ships: (previousResult, { mutationResult }) => {

            console.log(previousResult, mutationResult);

            return {
              ships: [...previousResult],
            };
          },
        },
      });
    },
  },
  data() {
    return {
      apolloResult: 'Pending..',
      shipName: '',
      editor1: '<h1>Example</h1><h2>Example</h2>',
      editor2: '<h1>Example</h1><h2>Example</h2>',
    };
  },
  computed: mapState({
    route: state => state.route,
    user: state => decodeJWT(state.authentication.token),
  }),
  updated() {
    this.equalizer = new Foundation.Equalizer($(".equalize"));
    console.log(this.equalizer);
  },
  destroyed() {
    this.equalizer.destroy();
  },
};

</script>
