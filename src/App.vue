<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login" v-if="!jwt">Login</router-link> 
      <router-link to="/route" v-if="jwt">Create a route</router-link> |
      <router-link to="/logout" v-if="jwt">Logout</router-link> 
      

    </div>
     <router-view v-on:changeJwt="setJwt()"/>
  </div>

</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  margin-right: 10%;
  text-align: right;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>



<script>

export default {
  data: function() {
    return {
      jwt: null
    };
  },
  created: function() {
    this.jwt = localStorage.jwt;
    console.log("My jwt is", this.jwt);
  },

  methods: {
    setJwt: function() {
      this.jwt = localStorage.jwt;
    }
  }
};
</script>

