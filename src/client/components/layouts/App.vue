<template lang="html">
    <div>
        <div class="row header">
          <h1>Web Launch Pad</h1>
          <router-link :to="{ name: 'home' }">Home</router-link>
          <router-link :to="{ name: 'auth.login' }">Login</router-link>
          <router-link :to="{ name: 'auth.register' }">Register</router-link>
        </div>
        <div class="row appcontainer">
          <router-view></router-view>
        </div>
    </div>
</template>
