<template>
   <v-app>
     <div>
    <v-toolbar
      dark
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-spacer></v-spacer>
      <h1 class="pt-8"> Login and Registration Form</h1>
      <v-spacer></v-spacer>
      <v-btn text @click="$router.push({ path: '/login' })">Login</v-btn>
      <v-btn text @click="logout()">Logout</v-btn>
    </v-toolbar>
  </div>

    <div id="nav" class="mt-5">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
    <router-view/>
   </v-app>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      if (this.$route.path !== '/login') this.$router.push({ path: '/login' });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(226, 226, 214);
  height:100%
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
